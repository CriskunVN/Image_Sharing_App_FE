interface User {
  token?: string;
  [key: string]: any;
}

export default function authHeader(): Record<string, string> {
  const userStr =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  let user: User | null = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {
    user = null;
  }
  if (user && user.token) {
    return { "x-access-token": user.token };
  } else {
    return {};
  }
}
