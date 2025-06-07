// API configuration
const getApiBaseUrl = (): string => {
  // In SSR, we need to handle both server and client contexts
  if (typeof window === 'undefined') {
    // Server-side: use environment variable or fallback to backend service URL
    return process.env.VITE_API_URL || 'http://backend:8000';
  } else {
    // Client-side: use environment variable or relative path
    return import.meta.env.VITE_API_URL || '/api';
  }
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // If API_BASE_URL starts with http, return full URL
  if (API_BASE_URL.startsWith('http')) {
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
  
  // Otherwise, return relative URL
  return `${API_BASE_URL}/${cleanEndpoint}`;
}; 