//доделать проброс ошибок из промиса вверх по стеку

<template>
    <div>
        <div v-if="isLoading==true">
            Загрузка...
        </div>

        <div v-else-if="!isAuth">
            <LoginForm
                v-bind:login="login"
                v-bind:registration="registration"
            ></LoginForm>
            <button 
                v-on:click="getUsers"
            >
                Получить пользователей
            </button>
        </div>

        <div v-else>
            <h1>
                {{
                    isAuth ? 
                    `Пользователь авторизован ${user.email}` : 
                    "АВТОРИЗУЙТЕСЬ"
                }}
            </h1> 

            <h1>
                {{
                    user.isActivated ? 
                    'Аккаунт подтвержден по почте' : 
                    'ПОДТВЕРДИТЕ АККАУНТ!!!!'
                }}
            </h1>

            <button v-on:click="logout()">
                Выйти
            </button>

            <div>
                <button v-on:click="getUsers()">
                    Получить пользователей
                </button>
            </div>

            <ul>
                <li 
                    v-for="(user, index) in users"
                    v-bind:key="index"
                >
                    {user.email}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import LoginForm from "./components/LoginForm.vue";
    import { API_URL } from "./constants/constants.js";
    import AuthService from "./services/AuthService.js";
    import UserService from "./services/UserService.js";

    export default {
        name: 'App',
        data() {
            return {
                user: {},
                users: [],
                isAuth: false,
                isLoading: false,
                email: "",
                password: "",
            }
        },
        components: {
            LoginForm,
        },
        mounted() {
            if (localStorage.getItem("token")) {
                this.checkAuth();
            }
        },
        methods: {
            setAuth(bool) {
                this.isAuth = bool;
            },
            setUser(user) {
                this.user = user;
            },
            setLoading (bool) {
                this.isLoading = bool;
            },
            async login(email, password) {
                try {
                    const request = AuthService.login(email, password)
                        .catch((error) => {return new Error(error)});
                    const response = await request;
                    console.log(response);
                    localStorage.setItem('token', response.accessToken);
                    this.setAuth(true);
                    this.setUser(response.user);
                } 
                catch (e) {
                    console.log(e.response.message);
                }
            },
            async registration(email, password) {
                try {
                    const request = AuthService.registration(email, password)
                        .catch((error) => {return new Error(error)});
                    const response = await request;
                    console.log(response);
                    localStorage.setItem("token", response.accessToken);
                    this.setAuth(true);
                    this.setUser(response.user);
                } 
                catch (e) {
                    console.log(e.response.message);
                }
            },
            async logout() {
                try {
                    const request = AuthService.logout()
                        .catch((error) => {return new Error(error)});
                    const response = await request;
                    console.log(response);
                    localStorage.removeItem("token");
                    this.setAuth(false);
                    this.setUser({});
                } 
                catch (e) {
                    console.log(e.response.message);
                }
            },
            async checkAuth() {
                this.setLoading(true);
                try {
                    const request = new Promise((succeed, fail) => {
                        const xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;
                        xhr.onload = () => {
                            const response = JSON.parse(xhr.responseText);
                            if (xhr.status == 200) { 
                                succeed(response);
                            }
                            else {
                                fail(response);
                            }
                        };
                        xhr.open("GET", `${API_URL}/refresh`);
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.send();
                    });

                    const response = await request;
                    console.log(response);

                    localStorage.setItem("token", response.accessToken);
                    this.setAuth(true);
                    this.setUser(response.user);
                } 
                catch (e) {
                    console.log(e.response.message);
                } 
                finally {
                    this.setLoading(false);
                }
            },
            async getUsers() {
                try {
                    const request = UserService.fetchUsers()
                        .catch((error) => {return new Error(error)});
                    const response = await request;
                    console.log(response);
                    this.users = response;
                    console.log(this.users);
                } 
                catch (e) {
                    console.log(e);
                }
            },
        },




    }
</script>

<style scoped></style>
  
<!--

import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
        );
    }

    return (
        <div>
            <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    );
};

export default observer(App);

-->