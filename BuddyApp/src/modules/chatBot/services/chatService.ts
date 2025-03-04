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
  return response.data.messages;
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
export const createNewMessage = async (chatId: string, prompt: string) => {
  const headers = await getAuthHeaders();
  const response = await axios.post(`${BASE_URL}`, { chatId, prompt }, { headers });
  return response.data;
};
