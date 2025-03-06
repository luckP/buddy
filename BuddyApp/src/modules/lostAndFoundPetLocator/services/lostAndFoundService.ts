import axios from "axios";
import { getAuth } from "firebase/auth";

const API_BASE_URL = "http://localhost:3836/api/lostFoundPets";

/**
 * Fetch lost/found pet reports near a location.
 * @param latitude User's latitude
 * @param longitude User's longitude
 */
export const getReports = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/nearby`, {
      params: { latitude, longitude, radius: 5 },
    });

    return response.data;
  } catch (error) {
    console.error("ERROR: Failed to fetch lost/found reports", error);
    throw error;
  }
};

/**
 * Create a new lost/found pet report.
 * @param petName Pet's name
 * @param description Details about the pet
 * @param images Array of image file paths
 * @param location Location as { latitude, longitude }
 * @param status "lost" or "found"
 */
export const createReport = async (
  petName: string,
  description: string,
  images: string[],
  location: { latitude: number; longitude: number },
  status: "lost" | "found"
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User is not authenticated");

  const token = await user.getIdToken();
  const userId = user.uid; // Get Firebase user ID

  // Ensure location is correctly formatted
  const geoLocation = JSON.stringify({
    type: "Point",
    coordinates: [location.longitude, location.latitude], // [longitude, latitude]
  });

  const formData = new FormData();
  formData.append("petName", petName);
  formData.append("description", description);
  formData.append("status", status);
  formData.append("location", geoLocation);
  formData.append("userId", userId);

  // Append images properly
  images.forEach((image, index) => {
    const filename = image.split("/").pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("images", {
      uri: image,
      name: filename || `upload-${Date.now()}-${index}.jpg`,
      type,
    } as unknown as Blob); // ✅ Explicitly cast as Blob
  });

  console.log("🟢 DEBUG: Submitting Report Data:", {
    petName,
    description,
    location: geoLocation,
    status,
    images,
  });

  try {
    const response = await axios.post(`${API_BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ DEBUG: Report Created Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("🚨 ERROR: Failed to create report", error.response?.data || error.message);
    throw error;
  }
};



  
  

/**
 * Fetch a lost/found pet report by ID.
 * @param id Report ID
 */
export const getReportById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("ERROR: Failed to fetch report by ID", error);
    throw error;
  }
};
