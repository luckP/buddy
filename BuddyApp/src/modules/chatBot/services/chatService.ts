import axios from "axios";
import { getAuth } from "firebase/auth";
import IaChatMessage from "../../../models/IaChatMessage";

const BASE_URL = "http://localhost:3836/api/chat";

/**
 * Fetches Firebase authentication headers.
 */
const getAuthHeaders = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
};

/**
 * Fetches the chat list for the authenticated user.
 */
export const fetchChatList = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${BASE_URL}/list`, { headers });

    // ✅ Ensure response contains a valid array
    return response.data || [];
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error;
  }
};

/**
 * Fetch chat messages for a given chat ID.
 */
export const fetchChatMessages = async (chatId: string): Promise<IaChatMessage[]> => {
  const headers = await getAuthHeaders();
  const response = await axios.post(`${BASE_URL}`, { chatId, allMessages: true }, { headers });

  console.warn('response:', response.data);
  if (!response.data || !Array.isArray(response.data.messages)) {
    console.warn('⚠️ Unexpected response from chat messages API:', response.data);
    return []; // Return empty array to avoid .map on undefined
  }

  return response.data.messages.map((message: any): IaChatMessage => ({
    ...message,
    date: new Date(message.date),
  }));
};

/**
 * Creates a new chat session.
 */
export const createNewChat = async (prompt: string) => {
  const headers = await getAuthHeaders();
  const response = await axios.post(`${BASE_URL}`, { prompt, allMessages: false }, { headers });
  return response.data;
};

/**
 * Sends a message to an existing chat.
 */
export const createNewMessage = async (chatId: string, prompt: string, imageUri?: string) => {
  const headers = await getAuthHeaders();

  const formData = new FormData();
  formData.append("chatId", chatId);
  formData.append("prompt", prompt);

  if (imageUri) {
    const fileName = imageUri.split('/').pop() || 'image.jpg';
    formData.append("image", {
      uri: imageUri,
      name: fileName,
      type: "image/jpeg",
    } as any); // 👈 `as any` to fix React Native FormData type mismatch
  }

  const response = await axios.post(`${BASE_URL}`, formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data", // 👈 IMPORTANT
    },
  });

  return response.data;
};


