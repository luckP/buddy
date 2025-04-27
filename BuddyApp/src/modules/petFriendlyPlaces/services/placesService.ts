import axios from 'axios';
import { API_BASE_URL } from '../../socialMedia/services/postService';

const API_BASE_URL_PET_FRIENDLY_PLACES = API_BASE_URL + '/petFriendlyPlaces';


export const fetchPlaces = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(API_BASE_URL_PET_FRIENDLY_PLACES);
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

export const uploadPlace = async (place: any) => { 
  console.log('Uploading place:', place);
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('Place uploaded successfully');
    }, 1000); // Simulating network delay
  });
}



