type LostAndFoundReport = {
    id: string;
    title: string;
    description: string;
    contact: string;
    images: string[];
    address: string;
    latitude: number;
    longitude: number;
    type: "lost" | "found";
}

export default LostAndFoundReport;