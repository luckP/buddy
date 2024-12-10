const BASE_URL = "http://localhost:3836"; // Replace with your server's base URL

export const fetchChatList = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/chatList?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch chat list");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error;
  }
};

export const fetchChatMessages = async (
  chatId: string,
  userId: string,
  prompt?: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, userId, prompt, allMessages: true }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch chat messages");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};

export const createNewChat = async (userId: string, prompt: string) => {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, prompt, allMessages: true }),
    });
    if (!response.ok) {
      throw new Error("Failed to create new chat");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating new chat:", error);
    throw error;
  }
};

export const createNewMessage = async (
  chatId: string,
  userId: string,
  prompt: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, userId, prompt }),
    });
    if (!response.ok) {
      throw new Error("Failed to send new message");
    }
    return await response.json();
  } catch (error) {
    console.error("Error sending new message:", error);
    throw error;
  }
};
