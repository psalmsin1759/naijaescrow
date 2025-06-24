import {userBaseUrl} from "@/utils/api/BaseUrl";
export interface Admin {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  business?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}


export interface AdminResponse {
  success: boolean;
  message: string;
  data?: Admin;
  token?: string;
}

export interface AdminArrayResponse {
  success: boolean;
  message: string;
  data?: Admin[];
}


export const login = async (
  email: string,
  password: string
): Promise<AdminResponse> => {
  try {
    const res = await fetch(`${userBaseUrl}admins/login`, {
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
      data: data.data,
      token: data.token
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};

export const forgotPassword = async (
  email: string
): Promise<AdminResponse> => {
  try {
    const res = await fetch(`${userBaseUrl}admins/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed ");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Password reset link sent to your email",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<AdminResponse> => {
  try {
    const res = await fetch(`${userBaseUrl}admins/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed ");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Password reset link sent to your email",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};

export const addAdmin = async (payload: Partial<Admin> & { password: string }): Promise<AdminResponse> => {
  try {
    const res = await fetch(`${userBaseUrl}admins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to add");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Add successfully",
      data: data.data,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};


export const deleteAdmin = async (adminId: string) => {
  try {
     await fetch(`${userBaseUrl}admins/${adminId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};


export const updateAdmin = async (
  id: string,
  payload: Admin
): Promise<AdminResponse> => {
  try {
    const res = await fetch(`${userBaseUrl}admins/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to upload");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Update successfully",
      data: data.data,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};

export const changePassword = async (
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<AdminResponse> => {
  try {
    const res = await fetch(`${userBaseUrl}admins/change-password/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({currentPassword, newPassword}),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to change");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Update successfully",
      data: data.data,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};


export const getAdminsByBusiness = async (
  businessId: string
): Promise<AdminArrayResponse> => {
  try {
    const res = await fetch(`${userBaseUrl}admins/business/${businessId}`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Fetched successfully",
      data: data.data,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};