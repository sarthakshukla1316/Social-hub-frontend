import axios from 'axios';

const api = axios.create({
    baseURL: 'https://socialhubb.herokuapp.com/',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// Authentication
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const sendOtpEmail = (data) => api.post('/api/send-otp-email', data);

export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const verifyOtpEmail = (data) => api.post('/api/verify-otp-email', data);

// Activation
export const activate = (data) => api.post('/api/activate', data);

export const logout = () => api.post('/api/logout');                                // Logout user

export const createRoom = (data) => api.post('/api/rooms', data);                   // create room
export const deleteRoom = (roomId) => api.get(`/api/rooms/delete/${roomId}`);

export const getAllRooms = () => api.get('/api/rooms');                             // fetch Rooms
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);                             // fetch Rooms


// Axios Interceptors 
api.interceptors.response.use(
(config) => {
    return config;
}, 
async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
            await axios.get('https://socialhubb.herokuapp.com/api/refresh', 
            {
                withCredentials: true,
            }
        );

        return api.request(originalRequest);

        } catch(err) {
            console.log(err.message);
        }
    }
    throw error;
});


export default api;