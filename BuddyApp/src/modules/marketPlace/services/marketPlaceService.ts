import ServiceCardProps from "../../../models/ServiceCardProps";

const services: ServiceCardProps[] = [
  {
    id: '1',
    title: 'Pawfect Groomers',
    rating: 4.5,
    category: 'Grooming',
    price: '$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image1.png', 'image2.png'], // Replace with actual image paths
    liked: true,
  },
  {
    id: '2',
    title: 'Healthy Paws Vet',
    rating: 5.0,
    category: 'Veterinary',
    price: '$$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image3.png', 'image1.png'],
    liked: false,
  },
  {
    id: '3',
    title: 'Healthy Paws Vet',
    rating: 5.0,
    category: 'Veterinary',
    price: '$$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image3.png', 'image1.png'],
    liked: false,
  },
  {
    id: '4',
    title: 'Healthy Paws Vet',
    rating: 5.0,
    category: 'Veterinary',
    price: '$$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image3.png', 'image1.png'],
    liked: false,
  },
  // Add more services as needed
];

  export const fetchStores = async () => {
    return new Promise<ServiceCardProps[]>((resolve) => {
      setTimeout(() => {
        resolve(services);
      }, 1000); // Simulating network delay
    });
  };
  
  export const fetchStore = async (id: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const store = services.find((service) => service.id === id);
        if (store) {
          resolve(store);
        } else {
          reject(new Error('Store not found'));
        }
      }, 1000); // Simulating network delay
    });
  };