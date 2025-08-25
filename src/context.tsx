import React, { createContext, useReducer, Dispatch } from "react";

// Định nghĩa kiểu dữ liệu cho user
export interface UserType {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  [key: string]: any;
}

// Định nghĩa kiểu cho state
type State = {
  auth: boolean;
  user: UserType | null;
  token: string; // dùng string rỗng khi chưa có
};

// Định nghĩa kiểu cho action
type Action =
  | { type: "LOGIN"; payload: { user: UserType; token: string } }
  | { type: "LOGOUT" };

// Khởi tạo state mặc định
const initialState: State = {
  auth: false,
  user: null,
  token: "",
};

// Định nghĩa context value type
type ContextValueType = {
  state: State;
  dispatch: Dispatch<Action>;
};

// Tạo context với kiểu dữ liệu rõ ràng
export const Context = createContext<ContextValueType>({
  state: initialState,
  dispatch: () => undefined,
});

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: false,
        user: null,
        token: "",
      };
    default:
      return state;
  }
};

// Provider component
const ContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
