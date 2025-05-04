import axios from 'axios';
import { getAuth } from 'firebase/auth';
import IaChatMessage from '../../../models/IaChatMessage';
import { API_BASE_URL } from '../../socialMedia/services/postService';

const BASE_URL_CHAT = API_BASE_URL + '/chat';

/**
 * Fetches Firebase authentication headers.
 */
const getAuthHeaders = async () => {
  try{

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");
    const token = await user.getIdToken();

    console.log("DEBUG: getAuthHeaders token:", token);
    return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  }
  catch (error) {
    console.error("Error fetching auth headers:", error);
    throw error;
  }
};

/**
 * Fetches the chat list for the authenticated user.
 */
export const fetchChatList = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${BASE_URL_CHAT}/list`, { headers });

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
  const response = await axios.post(`${BASE_URL_CHAT}`, { chatId, allMessages: true }, { headers });

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
 * Creates a new chat session with optional image upload.
 *
 * @param {string} prompt - Initial message from the user.
 * @param {string} [imageUri] - Optional URI of the image to send with the message.
 * @returns {Promise<Object>} Server response containing chatId and assistant reply.
 */
export const createNewChat = async (prompt: string, imageUri?: string) => {
  const headers = await getAuthHeaders();

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("allMessages", "false");

  if (imageUri) {
    const fileName = imageUri.split('/').pop() || 'image.jpg';
    formData.append("image", {
      uri: imageUri,
      name: fileName,
      type: "image/jpeg",
    } as any);
  }

  const response = await axios.post(`${BASE_URL_CHAT}`, formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("DEBUG: createNewChat response:", response.data);

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

  const response = await axios.post(`${BASE_URL_CHAT}`, formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data", // 👈 IMPORTANT
    },
  });

  console.log("DEBUG: createNewMessage response:", response.data);

  return response.data;
};