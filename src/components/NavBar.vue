<template>
    <nav class="navbar navbar-expand-lg nav-bg sticky-top bg-white p-0">
        <div class="container-fluid px-5">
            <router-link class="navbar-brand fs-3 fw-bold primary text-decoration-none d-flex align-items-center" to="/">
                <img src="@/assets/images/musicBuddyVueLogo.png" style="width: 60px">
                <span class="d-none d-sm-inline">MusicBuddy</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto fw-medium py-3">
                    <router-link to="/dashboard" class="nav-home mx-2">Dashboard</router-link>
                    <router-link to="/search" class="nav-search mx-2">Search</router-link>
                    <router-link to="/tags" class="nav-tags mx-2">Tags</router-link>
                    <router-link to="/tuneswipe" class="nav-tuneswipe mx-2">TuneSwipe</router-link>
                    <router-link to="/profile" class="nav-profile mx-2">Profile</router-link>
                    <router-link to="/login" class="nav-login mx-2" v-if="!isLoggedIn">Log In</router-link>
                    <router-link to="/signup" class="nav-signup mx-2" v-if="!isLoggedIn">Sign Up</router-link>
                    <a href="#" class="nav-logout mx-2" v-if="isLoggedIn" @click.prevent="logout">Log Out</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isLoggedIn: false
        };
    },
    watch: {
        '$route'() {
            this.checkAuth(); // Re-check auth whenever the route changes
        }
    },
    methods: {
        checkAuth() {
            const token = localStorage.getItem('access_token');
            this.isLoggedIn = !!token;
            if (!this.isLoggedIn) {
                // Hide the navigation links if not logged in
                document.querySelector('.nav-home').style.display = 'none';
                document.querySelector('.nav-search').style.display = 'none';
                document.querySelector('.nav-tags').style.display = 'none';
                document.querySelector('.nav-profile').style.display = 'none';
                document.querySelector('.nav-tuneswipe').style.display = 'none';
            }else {
                document.querySelector('.nav-home').style.display = 'block';
                document.querySelector('.nav-search').style.display = 'block';
                document.querySelector('.nav-tags').style.display = 'block';
                document.querySelector('.nav-profile').style.display = 'block';
                document.querySelector('.nav-tuneswipe').style.display = 'block';
            }
        },
        logout() {
            localStorage.clear();
            this.isLoggedIn = false;
            window.location.href = '/'; // Optional: Redirect to home page after logout
        }
    },
    mounted() {
        this.checkAuth();
    }
};
</script>