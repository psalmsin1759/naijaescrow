import {orderBaseUrl} from "@/utils/api/BaseUrl";


export interface Product {
    name: string;
    description: string;
    price?: number,
    quantity?: number;
}
export interface Order {
  _id?: string;
  product: Product;
  orderId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  businessId: string;
  sellerEmail: string;
  amount: number;
  deliveryFee: number;
  status: string;
  transactionRef?: string;
  shippedAt?: string;
  deliveredAt?: string;
  releasedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}


export interface OrderResponse {
  success: boolean;
  message: string;
  data?: Order;
  token?: string;
}

/* {
  "total": 0,
  "pending": 0,
  "completed": 0,
  "cancelled": 0
} */

export interface Stats {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
}

export interface OrderStatsResponse {
  success: boolean;
  message: string;
  data?: Stats;
}

export interface OrderArrayResponse {
  success: boolean;
  message: string;
  data?: Order[];
}

export const createOrder = async (payload: Partial<Order> ): Promise<OrderResponse> => {
  try {
    const res = await fetch(`${orderBaseUrl}orders`, {
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
      message: data.message || "Added successfully",
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

export const getOrdersById = async (
  orderId: string
): Promise<OrderResponse> => {
  try {
    const res = await fetch(`${orderBaseUrl}orders/${orderId}`);

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


export const getOrdersByBusinessId = async (
  businessId: string
): Promise<OrderArrayResponse> => {
  try {
    const res = await fetch(`${orderBaseUrl}orders/business/${businessId}`);

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


export const getOrdersByBuyerEmail = async (
  email: string
): Promise<OrderArrayResponse> => {
  try {
    const res = await fetch(`${orderBaseUrl}orders/buyer/${email}`);

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

export const getBusinessOrderStats = async (
  businessId: string
): Promise<OrderStatsResponse> => {
   const res = await fetch(`${orderBaseUrl}orders/stats/${businessId}`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch");
    }

    const data = await res.json();
    return data;
    
};

export const changeOrderStatus = async (
  orderId: string,
  status: string
): Promise<OrderResponse> => {
  try {
    const res = await fetch(`${orderBaseUrl}orders/status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status}),
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


export const cancelOrder = async (
  orderId: string,
): Promise<OrderResponse> => {
  try {
    const res = await fetch(`${orderBaseUrl}orders/cancel/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to change");
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Cancel successfully",
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


export const updateOrder = async (
  id: string,
  payload: Partial<Order>
): Promise<OrderResponse> => {
  try {
    const res = await fetch(`${orderBaseUrl}orders/${id}`, {
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