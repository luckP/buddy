import LostAndFoundReport from '../../../models/LostAndFoundReport';
import { apiFetch } from '../../../services/api';

// Fetch all reports
export const getReports = async (latitude: number, longitude: number) => {
    return new Promise<LostAndFoundReport[]>((resolve, reject) => {
        setTimeout(() => {
            const baseId = Math.floor(Math.random() * 1000);
            const reports: LostAndFoundReport[] = [{
                id: baseId + Math.random() + '',
                title: "Lost Dog",
                description: "Golden Retriever, last seen near Central Park.",
                images: [
                    "https://placecats.com/300/200",
                    "https://placecats.com/300/201",
                ],
                contact: "john@example.com",
                latitude:  latitude + (Math.random() - 0.5) / 50,
                longitude: longitude + (Math.random() - 0.5) / 50,
                address: "Central Park",
                type: "lost",
                
            },
            {
                id: baseId + Math.random() + '',
                title: "Lost Cat",
                description: "Golden Retriever Cat, last seen near Central Park.",
                images: [
                    "https://placecats.com/300/202",
                    "https://placecats.com/300/203",
                ],
                contact: "john@example.com",
                address: "Central Park",
                latitude: latitude + (Math.random() - 0.5) / 50,
                longitude: longitude + (Math.random() - 0.5) / 50,
                type: "found",
            },
            {
                id: baseId + Math.random() + '',
                title: "Lost Dog",
                description: "Golden Retriever, last seen near Central Park.",
                images: [
                    "https://placecats.com/300/204",
                    "https://placecats.com/300/205",
                ],
                contact: "john@example.com",
                latitude:  latitude + (Math.random() - 0.5) / 50,
                longitude: longitude + (Math.random() - 0.5) / 50,
                address: "Central Park",
                type: "lost",
                
            },
            {
                id: baseId + Math.random() + '',
                title: "Lost Cat",
                description: "Golden Retriever Cat, last seen near Central Park.",
                images: [
                    "https://placecats.com/300/206",
                    "https://placecats.com/300/207",
                ],
                contact: "john@example.com",
                address: "Central Park",
                latitude: latitude + (Math.random() - 0.5) / 50,
                longitude: longitude + (Math.random() - 0.5) / 50,
                type: "found",
            },

            {
                id: baseId + Math.random() + '',
                title: "Lost Dog",
                description: "Golden Retriever, last seen near Central Park.",
                images: [
                    "https://placecats.com/300/208",
                    "https://placecats.com/300/209",
                ],
                contact: "john@example.com",
                latitude:  latitude + (Math.random() - 0.5) / 50,
                longitude: longitude + (Math.random() - 0.5) / 50,
                address: "Central Park",
                type: "lost",
                
            },
        ];
            resolve([...reports]);
        }, 1000);
    })
};

// Create a new report
export const createReport = async (reportData: any) => {
    return apiFetch('/reports', {
        method: 'POST',
        body: JSON.stringify(reportData),
    });
};

// Fetch a specific report by ID
export const getReportById = async (id: string) => {
    return apiFetch(`/reports/${id}`);
};




