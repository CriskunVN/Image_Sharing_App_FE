import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type {
  FileType,
  AlertProps,
  UpdateFormProps,
} from "../utils/type.until";
import UserService from "../service/user.service";
import Alert from "./Alert";

const UpdateForm: React.FC<UpdateFormProps> = ({
  open,
  setOpen,
  file,
  fetchFiles,
}) => {
  const btnRef = useRef(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [alertState, setAlertState] = useState<AlertProps>({
    show: false,
    color: "green",
    msg: "",
  });

  useEffect(() => {
    setName(file?.name || "");
    setDescription(file?.description || "");
  }, [file]);

  const handleUpdate = () => {
    if (!name || !description) {
      setAlertState({
        show: true,
        color: "red",
        msg: "Please, enter valid name and description",
      });
      return;
    }
    if (!file) {
      setAlertState({
        show: true,
        color: "red",
        msg: "No file selected to update",
      });
      return;
    }
    UserService.updateFile({
      _id: file._id,
      filePath: file.filePath,
      name,
      description,
      createdAt: file.createdAt,
      createdBy: file.createdBy,
    })
      .then(() => {
        fetchFiles();
        setAlertState({
          show: true,
          color: "green",
          msg: "File updated successfully",
        });
        setTimeout(() => {
          setOpen(false);
          setAlertState({
            ...alertState,
            show: false,
          });
        }, 1500);
      })
      .catch(() => {
        setAlertState({
          show: true,
          color: "red",
          msg: "Failed to update the file",
        });
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={btnRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            />
          </Transition.Child> */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-500 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    {alertState.show ? (
                      <Alert
                        color={alertState.color}
                        msg={alertState.msg}
                        show={alertState.show}
                        setShowAlert={(value) =>
                          setAlertState({ ...alertState, show: value })
                        }
                      />
                    ) : null}
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-green-50"
                    >
                      Update File
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <label htmlFor="name" className="sr-only">
                          File's name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="File's name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mt-2 w-full">
                        <label htmlFor="description" className="sr-only">
                          File's description
                        </label>
                        <input
                          id="description"
                          name="description"
                          type="text"
                          autoComplete="description"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="File's description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpdate}
                  ref={btnRef}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateForm;
