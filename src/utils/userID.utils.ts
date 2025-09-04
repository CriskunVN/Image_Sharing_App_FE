export const getUserId = (): string | undefined => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userID = user?._id;
  return userID;
};
