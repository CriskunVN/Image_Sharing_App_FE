import React, { useState } from "react";
import type { FileType, UpdateFormProps } from "../utils/type.until";
interface FileProps {
  file: FileType;
  fetchFiles: () => void;
}
import UpdateForm from "./UpdateForm";

const Card: React.FC<FileProps> = ({ file, fetchFiles }) => {
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  return (
    <>
      <UpdateForm
        open={openUpdate}
        setOpen={setOpenUpdate}
        file={file}
        fetchFiles={fetchFiles}
      />
      <div className="max-w-sm rounded overflow-hidden shadow-lg border-2">
        <iframe
          style={{ height: "20rem" }}
          className="w-full"
          // src={file.filePath}
          src={
            "https://png.pngtree.com/element_our/png_detail/20181013/code-icon-design-vector-png_125856.jpg"
          }
          title={file.name}
        ></iframe>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{file.name}</div>
          <p className="text-gray-700 text-base">{file.description}</p>
        </div>
        <div className="inline-flex px-6 pb-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={() => {
              setOpenUpdate(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
