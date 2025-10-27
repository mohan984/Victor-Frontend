import axios from 'axios';

// 1. Create a new Axios instance
const api = axios.create({
  baseURL: "  https://tall-beers-cough.loca.lt",
  headers: {
    'Content-Type': 'application/json',

  },
});

// 2. Add a request interceptor to attach the access token
api.interceptors.request.use(
  (config) => {
    // Check if window is defined to ensure this code runs only on the client-side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for a 401 error and that we haven't retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh');

        if (refreshToken) {
          try {
            // Send the refresh token to the refresh endpoint
            const response = await api.post('/accounts/token/refresh/', {
              refresh: refreshToken,
            });

            const newAccessToken = response.data.access;
            
            // Save the new access token to localStorage
            localStorage.setItem('access', newAccessToken);

            // Update the header on the original request
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Retry the original request
            return api(originalRequest);

          } catch (refreshError) {
            console.error("Token refresh failed!", refreshError);
            // Clear tokens and redirect to login if refresh fails
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else {
          // If no refresh token is available, redirect to login
          console.log("No refresh token available.");
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// 4. Export the configured instance
export default api;

