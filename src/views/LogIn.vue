<template>
    <div class="container h-100">
        <div class="card shadow-lg mt-5">
            <div class="card-body p-0">
                <div class="row justify-content-center m-0">
                    <div class="col-md-6 d-none d-md-block">
                        <img src="../assets/images/posters.png" class="cover-image">
                    </div>
                    <div class="col-md-6 justify-content-center align-items-center h-100">
                        <main class="w-100 m-auto p-2 d-flex justify-content-center align-items-center fw-bold  rounded-3">
                            <form class="w-75 py-5" @submit.prevent="login">
                                <h1 class="parent-text text-start align-items-center justify-content-center fw-bold fw-bolder pb-4 my-2">
                                    Sign in
                                </h1>

                                <div class="pb-2">
                                    <div class="form-floating my-1 mx-1">
                                        <input type="email" class="form-control" id="email" name="email"
                                               placeholder="name@example.com" v-model="email" required>
                                        <label for="email">Email address</label>
                                    </div>
                                    <div class="form-floating my-1 mx-1">
                                        <input type="password" class="form-control" id="password" name="password"
                                               placeholder="Password" v-model="password"
                                               required>
                                        <label for="password">Password</label>
                                    </div>
                                </div>

                                <button class="btn btn-primary w-100 py-2" id="loginForm"> Sign in </button>

                                <div class="text-center align-content-center fw-bolder mt-3 ">
                                    <a href="/forgot-password" class="hover-link text-decoration-none">Forgot
                                        password?</a>
                                </div>

                                <div class="card-footer-login my-3">
                                    <div class="text-center align-content-center fw-bolder mt-3 ">
                                        <p>Don't have an account?
                                            <router-link to="/signup" class="nav-login mx-2">Register</router-link>
                                        </p>

                                    </div>

                                    <hr class="my-4">

                                    <div class="text-center align-content-center fw-bolder mt-3 ">
                                        <p>Or sign in with</p>
                                    </div>

                                    <a href="/auth/spotify" class="mb-2  btn btn-success btn w-100"><i
                                        class="fa-brands fa-spotify"></i> Spotify</a>
                                    <a href="/auth/apple"  class="mt-2  btn btn-danger btn w-100"><i
                                        class="fa-brands fa-apple"></i> Apple Music</a>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/users';
import {refreshToken} from "@/api/spotify";
export default {
    components: {},
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await login({ email: this.email, password: this.password });

                if (response.data.status === 200) {
                    localStorage.setItem('access_token', response.data.token);
                    localStorage.setItem('spotify_refresh_token', response.data.spotify_refresh_token);
                    try {
                        const response = await refreshToken({refresh_token: response.data.spotify_refresh_token});
                        localStorage.setItem('spotify_access_token', response.data.access_token);
                        // localStorage.setItem('spotify_refresh_token', response.data.refresh_token);
                        localStorage.setItem('token_generate_time', Date.now());
                    } catch (error) {
                        console.error('Failed to fetch recently played tracks:', error);
                    }
                    this.$router.push('/dashboard'); // Redirect to dashboard or another page
                } else {
                    alert('Login failed: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login.');
            }
        }
    },
}
</script>