import axios from 'axios';
import constant from '../constant';

class ContactService {
    constructor() {
        this.url = `${constant.server}/contact`;
    }

    async getContacts() {
        return await axios.get(`${this.url}/getAll`, { withCredentials: true }).then(result => result.data);
    }

    async createContact(contact) {
        return await axios.post(`${this.url}/create`, contact, { withCredentials: true }).then(result => result.data);
    }

    async updateContact(contectId, contact) {
        return await axios.post(`${this.url}/update/${contectId}`, contact, { withCredentials: true }).then(result => result.data);
    }

    async removeContact(contectId) {
        return await axios.delete(`${this.url}/remove/${contectId}`, { withCredentials: true }).then(result => result.data);
    }
}

const contactService = new ContactService();
export default contactService;