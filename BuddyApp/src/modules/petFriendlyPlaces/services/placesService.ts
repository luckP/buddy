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

export const fetchPlaces = async (latitude: number, longitude: number) => {
  return new Promise((resolve) => {
    const places = placesData.map((place) => {
      const distance = Math.sqrt(
        Math.pow(latitude - place.latitude, 2) + Math.pow(longitude - place.longitude, 2)
      );
      const id = place.id + Math.random();
      const newLatitude = latitude + (Math.random() - 0.5) / 50;
      const newLongitude = longitude + (Math.random() - 0.5) / 50;
      return { ...place, id, latitude:newLatitude, longitude:newLongitude, distance };
    });
    setTimeout(() => {
      resolve(places);
    }, 1000);
  });
};