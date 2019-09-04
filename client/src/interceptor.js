import axios from 'axios';

export default function() {

    axios.interceptors.request.use((request) => {
        return request;
    });

    axios.interceptors.response.use((response) => {
        if (response.status == 404 && response.data.message === 'Unauthorized request') {
            localStorage.clear();
        }
        return response;
    }, (error) => {

    });
}