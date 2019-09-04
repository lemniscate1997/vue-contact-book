import axios from 'axios';
import constant from '../constant';

class UserService {

    constructor() {
        this.url = `${constant.server}/auth`;
    }

    async validateUser(userName, password) {
        return await axios.post(`${this.url}/login`, { Username: userName, Password: password }, { withCredentials: true }).then(result => result.data);
    }

    async signUp(user) {
        await axios.post(`${this.url}/signup`, user, null);
    }

    async signOut() {
        await axios.post(`${this.url}/logout`, null);
    }

    getToken() {
        const user = localStorage.getItem("user");
        if (user) {
            return user;
        } else {
            return false;
        }
    }
}

const userService = new UserService();
export default userService;