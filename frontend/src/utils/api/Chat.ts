import {chatBaseUrl} from "@/utils/api/BaseUrl";

export interface ChatMessage {
  _id?: string;
  orderId: string;
  senderId: string;
  senderRole: string;
  message: string;
  isRead?: string;
  createdAt: string;
}


export interface ChatResponse {
  success: boolean;
  message: string;
  data?: ChatMessage[];
}


export const getChatHistory = async (
  orderId: string
): Promise<ChatResponse> => {
  try {
    const res = await fetch(`${chatBaseUrl}chats/${orderId}/history`);

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