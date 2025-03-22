//без http/index
//просто работаю с экземпляром XMLHttpRequest
//может быть если был бы это пет проектом, то выделил в отдельный метод в http/index

import API_URL from "../constants/constants.js";

export default class AuthService {
    static async login(email, password) {
        const data = JSON.stringify({email, password});
        const xhr = new XMLHttpRequest();
        xhr.withCredentials(true);
        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            return response;
        };
        xhr.open("POST", API_URL + "/login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

    static async registration(email, password) {
        const data = JSON.stringify({email, password});
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            return response;
        };
        xhr.open("POST", API_URL + "/registration");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

    static async logout() {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            return response;
        };
        xhr.open("POST", API_URL + "/logout");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
}

/*
import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> { 
        return $api.post<AuthResponse>("/login", {email, password});
    }
    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/registration", {email, password});
    }
    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}
*/