const BASE_URL = 'https://your-api-url.com';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        return response.json();
    } catch (error: any) {
        console.error(`API Fetch Error: ${error.message}`);
        throw error;
    }
};
