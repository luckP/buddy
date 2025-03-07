import axios from 'axios';

const API_BASE_URL = "http://localhost:3836/api/petFriendlyPlaces";


export const fetchPlaces = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet-friendly places:', error);
    return [];
  }
};

export const addReview = (id: any, place: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Review added successfully');
    }, 1000); // Simulating network delay
  });
}



