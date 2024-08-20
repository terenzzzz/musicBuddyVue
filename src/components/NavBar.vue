<template>
    <nav class="navbar navbar-expand-lg nav-bg sticky-top bg-white p-0">
        <div class="container-fluid px-5">
            <router-link class="navbar-brand fs-3 fw-bold primary text-decoration-none d-flex align-items-center" to="/">
                <img src="@/assets/images/musicBuddyVueLogo.png" style="width: 60px" alt="MusicBuddy Logo">
                <span class="d-none d-sm-inline">MusicBuddy</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto fw-medium py-3">
                    <router-link
                        :class="navItemClass('/dashboard')"
                        to="/dashboard"
                        v-if="isLoggedIn"
                        class="nav-item mx-2 fit-content">Dashboard</router-link>
                    <router-link
                        :class="navItemClass('/search')"
                        to="/search"
                        v-if="isLoggedIn"
                        class="nav-item mx-2 fit-content">Search</router-link>
                    <router-link
                        :class="navItemClass('/tags')"
                        to="/tags"
                        v-if="isLoggedIn"
                        class="nav-item mx-2 fit-content">Tags</router-link>
                    <router-link
                        :class="navItemClass('/tuneswipe')"
                        to="/tuneswipe"
                        v-if="isLoggedIn"
                        class="nav-item mx-2 fit-content">TuneSwipe</router-link>
                    <router-link
                        :class="navItemClass('/profile')"
                        to="/profile"
                        v-if="isLoggedIn"
                        class="nav-item mx-2 fit-content">Profile</router-link>
                    <router-link
                        :class="navItemClass('/login')"
                        to="/login"
                        v-if="!isLoggedIn"
                        class="nav-item mx-2 fit-content">Log In</router-link>
                    <router-link
                        :class="navItemClass('/signup')"
                        to="/signup"
                        v-if="!isLoggedIn"
                        class="nav-item mx-2">Sign Up</router-link>
                    <a href="#" class="nav-item mx-2 fit-content" v-if="isLoggedIn" @click.prevent="logout">Log Out</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isLoggedIn: false,
        };
    },
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    },
    watch: {
        '$route.path': {
            immediate: true,
            handler() {
                this.checkAuth();
                this.collapseNavbar();
            }
        }
    },
    methods: {
        checkAuth() {
            const token = localStorage.getItem('access_token');
            this.isLoggedIn = !!token;
        },
        collapseNavbar() {
            const navbarToggler = document.querySelector(".navbar-toggler");
            if (navbarToggler && navbarToggler.getAttribute("aria-expanded") === "true") {
                navbarToggler.click();
            }
        },
        logout() {
            localStorage.clear();
            this.isLoggedIn = false;
            this.$router.push('/'); // Redirect to home page after logout
        },
        navItemClass(path) {
            return this.currentRoute.startsWith(path) ? 'active' : '';
        }
    },
    mounted() {
        this.checkAuth();
    }
};
</script>

<style lang="css" scoped>
.nav-item {
    padding: 5px;
}

.nav-item.active {
    color: #0d6efd; /* Highlighed text color */
    border-bottom: 3px solid #0d6efd;
}

.fit-content {
    width: fit-content;
}
</style>
