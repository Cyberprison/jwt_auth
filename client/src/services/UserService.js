export default class UserService {
    static fetchUsers() {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                const json = xhr.response;
                console.log(json);
                return json;
            }
        };
        xhr.open("GET", "/users");
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
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