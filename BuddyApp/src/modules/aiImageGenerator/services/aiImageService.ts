import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { API_BASE_URL } from '../../socialMedia/services/postService';
import { AiImage } from '../../../models/AiImage';

const BASE_URL_AI_IMAGES = API_BASE_URL + '/ai-images';

const getAuthHeaders = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");
  const token = await user.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchAiImages = async (): Promise<AiImage[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${BASE_URL_AI_IMAGES}/gallery`, { headers });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching AI images:", error);
    throw error;
  }
};

export const generateAiImage = async (prompt: string, referenceUri?: string) => {
  const headers = await getAuthHeaders();

  const formData = new FormData();
  formData.append("prompt", prompt);

  if (referenceUri) {
    const fileName = referenceUri.split('/').pop() || 'image.jpg';
    formData.append("reference", {
      uri: referenceUri,
      name: fileName,
      type: "image/jpeg",
    } as any);
  }

  const response = await axios.post(`${BASE_URL_AI_IMAGES}/generate`, formData, {
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
