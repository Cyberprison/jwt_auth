<template>
    <div>
        <div v-if="isLoading==true">
            Загрузка...
        </div>

        <div v-else-if="!isAuth">
            <LoginForm
                v-on:login="login"
                v-on:registration="registration"
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

    export default {
        name: 'App',
        data() {
            return {
                user: {},
                users: [],
                isAuth: false,
                isLoading: false
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
                    const response = await AuthService.login(email, password);
                    console.log(response)
                    localStorage.setItem('token', response.data.accessToken);
                    setAuth(true);
                    setUser(response.data.user);
                } 
                catch (e) {
                    console.log(e.response.data.message);
                }
            },
            async registration(email, password) {
                try {
                    const response = await AuthService.registration(email, password);
                    console.log(response)
                    localStorage.setItem('token', response.data.accessToken);
                    setAuth(true);
                    setUser(response.data.user);
                } 
                catch (e) {
                    console.log(e.response.data.message);
                }
            },
            async logout() {
                try {
                    const response = await AuthService.logout();
                    localStorage.removeItem('token');
                    setAuth(false);
                    setUser({});
                } 
                catch (e) {
                    console.log(e.response.data.message);
                }
            },
            async checkAuth() {
                this.setLoading(true);
                try {
                    const request = new Promise((succeed, fail) => {
                        const xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;
                        xhr.onload = () => {
                            succeed(xhr.response);
                        };
                        xhr.open("GET", `${API_URL}/refresh`);
                        xhr.responseType = "json";
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
                    console.log(e.response.data.message);
                } 
                finally {
                    this.setLoading(false);
                }
            },
            async getUsers() {
                try {
                    const response = await UserService.fetchUsers();
                    setUsers(response.data);
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