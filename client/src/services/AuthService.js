//без http/index
//просто работаю с экземпляром XMLHttpRequest
//может быть если был бы это пет проектом, то выделил в отдельный метод в http/index

import { API_URL } from "../constants/constants.js";

export default class AuthService {
    static async login(email, password) {
        return new Promise((succeed, fail) => {
            const data = JSON.stringify({email, password});
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) { 
                    succeed(response);
                }
                else {
                    fail(response);
                }
            };
            xhr.open("POST", API_URL + "/login", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        });
    }

    static async registration(email, password) {
        return new Promise((succeed, fail) => {
            const data = JSON.stringify({email, password});
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) { 
                    succeed(response);
                }
                else {
                    fail(response);
                }
            };
            xhr.open("POST", API_URL + "/registration", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        })
    }

    static async logout() {
        return new Promise((succeed, fail) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) { 
                    succeed(response);
                }
                else {
                    fail(response);
                }
            };
            xhr.open("POST", API_URL + "/logout", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        });
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