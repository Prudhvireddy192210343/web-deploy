export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://180.235.121.253:8137';

export const apiCall = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: options.body instanceof FormData
            ? options.headers
            : { ...defaultHeaders, ...options.headers },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
};
