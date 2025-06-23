import {baseUrl} from "@/utils/api/BaseUrl";
export interface Admin {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: string;
}

export interface AdminResponse {
  success: boolean;
  message: string;
  data?: Admin;
}


export const login = async (
  email: string,
  password: string
): Promise<AdminResponse> => {
  try {
    const res = await fetch(`${baseUrl}admins/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to login");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Login successfully",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};