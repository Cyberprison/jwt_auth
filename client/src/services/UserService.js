import { API_URL } from "../constants/constants.js";

export default class UserService {
    static fetchUsers() {
        return new Promise((succeed, fail) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onload = () => {
                if (xhr.status == 200) {
                    if (xhr.status == 200) { 
                        succeed(response);
                    }
                    else {
                        fail(response);
                    }
                }
            };
            xhr.open("GET", API_URL + "/users", true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send();
        });
    }
}

/*
import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> { 
        return $api.get<IUser[]>("/users');
    }
}
*/