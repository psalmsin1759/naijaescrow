import {FormData} from "@/context/FormContext";
import {baseUrl} from "@/utils/api/BaseUrl";




export interface Business {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  description?: string;
}

export interface BusinessResponse {
  success: boolean;
  message: string;
  data?: Business;
}

export const createBusiness = async (
  payload: Business
): Promise<BusinessResponse> => {
  try {
    const res = await fetch(`${baseUrl}businesses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create business");
    }

    const data = await res.json();
    return {
      success: true,
      message: "Business created successfully",
      data: data.business,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};


export const validateBusiness = async (
  email: string,
  code: string
): Promise<BusinessResponse> => {
  try {
    const res = await fetch(`${baseUrl}businesses/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to verify business");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Business verified successfully",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};


export const resendBusinessVerificationEmail = async (
  email: string
): Promise<BusinessResponse> => {
  try {
    const res = await fetch(`${baseUrl}businesses/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to resend verification email");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Verification email resent",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};


export const createBusinessWithAdmin = async (
  payload: FormData
): Promise<BusinessResponse> => {
  try {
    const res = await fetch(`${baseUrl}businesses/create-with-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log (res);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create business and admin");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Business and admin created successfully",
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


export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<BusinessResponse> => {
  try {
    const res = await fetch(`${baseUrl}businesses/sendWelcomeEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to send welcome email");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Welcome email sent successfully",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};


