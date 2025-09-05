import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import UserService from "../service/user.service";
import Loader from "../components/Loader";
import type { FileType } from "../utils/type.until";

const View: React.FC = () => {
  const [files, setFiles] = useState<Array<FileType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchFiles = () => {
    UserService.getFiles()
      .then((response) => {
        setFiles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        {files.length === 0 && !loading && (
          <p className="text-center text-3xl mt-10 border-b-2">
            No files found
          </p>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4 m-10 grid">
        {files.map((file) => {
          return (
            <Card file={file} key={file.filePath} fetchFiles={fetchFiles} />
          );
        })}
      </div>
      <div className="flex justify-center">{loading && <Loader />}</div>
    </>
  );
};

export default View;
