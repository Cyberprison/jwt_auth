<template>
    <div>
        <input
            v-model="email"
            type="text"
            placeholder='Email'
        />
        <input
            v-model="password"
            type="password"
            placeholder='Password'
        />
        <button v-on:click="login(email, password)">
            Login
        </button>
        <button v-on:click="registration(email, password)">
            Registration
        </button>
    </div>
</template>

<script>

export default {
    name: "LoginForm",
    props: [
        "login",
        "registration",
    ],
    data() {
        return {
            email: "",
            password: ""
        }
    }
}
</script>

<style scoped>

</style>


<!--
import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={() => store.login(email, password)}>
                Логин
            </button>
            <button onClick={() => store.registration(email, password)}>
                Регистрация
            </button>
        </div>
    );
};

export default observer(LoginForm);
-->