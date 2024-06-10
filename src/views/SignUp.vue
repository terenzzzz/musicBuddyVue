<template>
    <div class="container">
        <div class="card shadow-lg mt-5">
            <div class="card-body p-0">
                <div class="row justify-content-center m-0">
                    <div class="col-md-6 d-none d-md-block">
                        <img src="../assets/images/posters.png" class="cover-image">
                    </div>
                    <div class="col-md-6">
                        <div class="justify-content-center h-100 align-items-center">
                            <main class="w-100 d-flex justify-content-center align-items-center fw-bold">
                                <form class="w-75" @submit.prevent="handleSubmit">
                                    <h1 class="text-start align-items-center justify-content-center fw-bold fw-bolder mt-5">
                                        Sign up
                                    </h1>

                                    <!----------------------------------------- Registration field entries ----------------------------------------->
                                    <div class="pt-4 pb-2">
                                        <div class="row mb-4">
                                            <div class="col-md-12 p-0 px-1">
                                                <div class="row d-flex justify-content-center mb-2">
                                                    <label for="avatar" class="form-label">Upload images of your device</label>
                                                    <div class="col-6" id="avatarPreview">
                                                        <img v-if="avatar" :src="avatarPreview" alt="Avatar Preview" class="img-thumbnail">
                                                    </div>
                                                    <input class="form-control" type="file" id="avatar" name="avatar" accept="image/*" @change="handleFileChange"
                                                    required>
                                                </div>

                                                <div class="row mb-2">
                                                    <div class="col-lg-12 px-1">
                                                        <div class="form-floating">
                                                            <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="form.name" required>
                                                            <label for="name">Name</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mb-2">
                                                    <div class="col-lg-12 px-1">
                                                        <div class="form-floating">
                                                            <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" v-model="form.email" required>
                                                            <label for="email">Email address</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row my-4">
                                            <div class="col-md-12 p-0 px-1">
                                                <div class="row mb-2">
                                                    <div class="col-md-12 px-1">
                                                        <div class="form-floating">
                                                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="form.password" required>
                                                            <label for="password">Password</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mb-2">
                                                    <div class="col-md-12 px-1">
                                                        <div class="form-floating">
                                                            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" v-model="form.confirmPassword" required>
                                                            <label for="confirmPassword">Confirm Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!------------------------------ Terms and Conditions Checkbox ---------------------------------->
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-check form-switch text-center m-1 d-flex justify-content-center mb-4">
                                                <input class="form-check-input" type="checkbox" id="tcCheck" name="tcCheck" v-model="form.tcCheck" required>
                                                <label class="form-check-label ms-3" for="tcCheck">
                                                    Agree to the <a href="#" class="hover-link text-decoration-none">Terms and Conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-------------------------------- Captcha ---------------------------------->
                                    <div class="card-footer-sign my-2">
                                        <button class="btn btn-primary w-100 py-2" type="submit">
                                            Sign Up
                                        </button>

                                        <div class="text-center align-content-center fw-bolder mt-3">
                                            <p>Already have an account? <router-link to="/login">Log In</router-link></p>
                                        </div>
                                    </div>
                                </form>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { signup } from '@/api/users';

export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                tcCheck: false
            },
            avatar: null,
            avatarPreview: null
        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            this.avatar = file;
            this.avatarPreview = URL.createObjectURL(file);
        },
        async handleSubmit() {
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('email', this.form.email);
            formData.append('password', this.form.password);
            formData.append('confirmPassword', this.form.confirmPassword);
            formData.append('avatar', this.avatar);

            try {
                const response = await signup(formData);
                if (response.data.status === 200) {
                    this.$router.push('/login');
                } else {
                    alert("Signup failed: " + response.data.message);
                }
            } catch (error) {
                alert("An error occurred: " + error.message);
            }
        }
    }
};
</script>
