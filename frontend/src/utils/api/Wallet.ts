import { walletBaseUrl } from "@/utils/api/BaseUrl";

export interface Wallet {
  _id?: string;
  userId?: string;
  balance: number;
  currency?: string;
  type?: string;
}

interface WalletInput {
  userId: string;
  amount: number;
  reference: string;
  narration: string;
  type?: string;
  source?: string;
}

export interface WalletTransaction {
  userId: string;
  amount: number;
  reference: string;
  narration: string;
  type?: string;
  source?: string;
  createdAt?: string;
}

 interface WalletTransactionResponse {
  success: boolean;
  message: string;
  data?: WalletTransaction[];
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data?: Wallet;
}

export interface WalletWithdrawnResponse {
  success: boolean;
  message: string;
  data?: number;
}

export const creditWallet = async (
  input: Partial<WalletInput>
): Promise<WalletResponse> => {
  try {
    const res = await fetch(`${walletBaseUrl}wallet/credit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to credit");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Wallet credited",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};

export const debitWallet = async (
  input: Partial<WalletInput>
): Promise<WalletResponse> => {
  try {
    const res = await fetch(`${walletBaseUrl}wallet/debit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to withdraw");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Wallet credited",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};

export const getWallet = async (
  businessId: string
): Promise<WalletResponse> => {
  try {
    const res = await fetch(`${walletBaseUrl}wallet/${businessId}`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch");
    }

    return  await res.json();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};

export const getTotalWithdrawn = async (
  businessId: string
): Promise<WalletWithdrawnResponse> => {
  try {
    const res = await fetch(
      `${walletBaseUrl}wallet/${businessId}/total-withdrawn`
    );

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


export const getTransactions = async (
  businessId: string
): Promise<WalletTransactionResponse> => {
  try {
    const res = await fetch(
      `${walletBaseUrl}wallet/transactions/${businessId}`
    );

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