const placesData = [
  {
    id: '1',
    name: 'Central Park',
    description: 'A great place to walk your pet.',
    latitude: 40.785091,
    longitude: -73.968285,
    image: "https://placecats.com/300/204",
  },
  {
    id: '2',
    name: 'Pet Friendly Cafe',
    description: 'Cozy cafe that allows pets.',
    latitude: 40.78306,
    longitude: -73.95978,
    image: "https://placecats.com/300/204",
  },
  {
    id: '3',
    name: 'Dog Park',
    description: 'Spacious park for dogs.',
    latitude: 40.78952,
    longitude: -73.95663,
    image: "https://placecats.com/300/204",
  },
];

export const fetchPlaces = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(placesData);
    }, 1000); // Simulating network delay
  });
};