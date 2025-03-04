type LostAndFoundReport = {
    id: string;
    petName: string;  // 🔹 Name of the lost/found pet
    title: string;
    description: string;
    contact: string;
    images: string[]; // Array of image URLs

    address: string;
    
    // 🔹 GeoJSON-style location for better database compatibility
    location: {
        type: "Point"; 
        coordinates: [number, number]; // [longitude, latitude]
    };

    // 🔹 Status to track pet case progression
    status: "lost" | "found" | "reunited"; 
};

export default LostAndFoundReport;
