export type FileType = {
  _id: string;
  filePath: string;
  name: string;
  description: string;
  createdAt?: string | Date;
  createdBy?: string;
};

export interface IUser {
  _id?: string; // Nếu dùng MongoDB, thường có _id
  firstName?: string | null;
  lastName?: string | null;
  username: string;
  email: string;
  password: string;
  token?: string;
  isConfirmed?: boolean;
}

export type AlertProps = {
  color: string;
  msg: string;
  show: boolean;
  setShowAlert?: (value: boolean) => void;
};

export type UpdateFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  file: FileType | null;
  fetchFiles: () => void;
};
