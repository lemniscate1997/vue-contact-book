import { BehaviorSubject } from 'rxjs';

class BaseService {

    constructor() {
        this.isLogin = new BehaviorSubject(false);
    }

    userLogInStatus(flag) {
        this.isLogin.next(flag);
    }

    getUserLogInStatus() {
        return this.isLogin.asObservable();
    }
}

const baseService = new BaseService();
export default baseService;