<template>
    <div class="profile">
        <div class="container-fluid">
            <div v-if="user" class="my-3">
                <div class="row d-flex justify-content-end">
                    <div class="col-12 col-sm-6 col-md-4 d-flex justify-content-end">
                        <a href="/linkToSpotify" class="mb-2  btn btn-success btn text-white"><i
                            class="fa-brands fa-spotify"></i> Connect to Spotify</a>
                    </div>
                </div>

                <div class="page-container mx-auto my-3">
                    <div class="row d-flex justify-content-center mt-5 mb-2">
                        <div class="col-3 d-flex flex-column justify-content-center text-center">
                            <img :src="getAvatarUrl(user.avatar)" class="rounded-circle img-fluid">
                            <strong>{{ user.name }}</strong>
                        </div>
                    </div>

                    <div class="card shadow rounded-5">
                        <div class="row text-center my-3">
                            <div class="col-4 d-flex flex-column">
                                <p><strong>309</strong></p>
                                <p class="text-muted">Songs Listened</p>
                            </div>
                            <div class="col-4 d-flex flex-column">
                                <p><strong>309</strong></p>
                                <p class="text-muted">Songs Listened</p>
                            </div>
                            <div class="col-4 d-flex flex-column">
                                <p><strong>309</strong></p>
                                <p class="text-muted">Songs Listened</p>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3 my-2">
                        <div class="col-12 col-md-12 col-lg-6 col-xl-4">
                            <div class="playing-history card rounded-5 p-3 my-2 h-100 shadow">
                                <div>
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h5>Playing History</h5>
                                        <a href="#" class="text-white">All</a>
                                    </div>
                                    <div class="row">
                                        <div class="col-1 d-flex justify-content-center align-items-center">1</div>
                                        <div class="col-2">
                                            <img src="https://via.placeholder.com/50" alt="Album Cover">
                                        </div>
                                        <div class="col-7">
                                            <div><strong>Redemption</strong></div>
                                            <div>Write This Down</div>
                                        </div>
                                        <div class="col-2 play-count">
                                            <div>5</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-1 d-flex justify-content-center align-items-center">2</div>
                                        <div class="col-2">
                                            <img src="https://via.placeholder.com/50" class="img-fluid">
                                        </div>
                                        <div class="col-7">
                                            <div><strong>Redemption</strong></div>
                                            <div>Write This Down</div>
                                        </div>
                                        <div class="col-2 play-count">
                                            <div>5</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-1 d-flex justify-content-center align-items-center">3</div>
                                        <div class="col-2">
                                            <img src="https://via.placeholder.com/50" alt="Album Cover">
                                        </div>
                                        <div class="col-7">
                                            <div><strong>Baby Don't Go</strong></div>
                                            <div>Dum Dum Girls</div>
                                        </div>
                                        <div class="col-2 play-count">
                                            <div>5</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-12 col-lg-6 col-xl-4">
                            <div class="most-listened card rounded-5 p-3 my-2 h-100 shadow">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5>Most Listened Song</h5>
                                <a href="#" class="text-white">All</a>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="text-center">
                                        <img src="https://via.placeholder.com/100" alt="Failed to load image">
                                        <div><strong>Redemption</strong></div>
                                        <div>Write This Down</div>
                                        <div class="rank">Top 1</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="text-center">
                                        <img src="https://via.placeholder.com/100" alt="Failed to load image">
                                        <div><strong>Redemption</strong></div>
                                        <div>Write This Down</div>
                                        <div class="rank">Top 2</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="text-center">
                                        <img src="https://via.placeholder.com/100" alt="Failed to load image">
                                        <div><strong>Baby Don't Go</strong></div>
                                        <div>Dum Dum Girls</div>
                                        <div class="rank">Top 3</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="col-12 col-md-12 col-lg-6 col-xl-4">
                            <div class="most-artist card rounded-5 p-3 my-2 h-100 shadow">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5>Most Listened Song</h5>
                                <a href="#" class="text-white">All</a>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="text-center">
                                        <img src="https://via.placeholder.com/100" class="rounded-circle">
                                        <div><strong>Redemption</strong></div>
                                        <div class="rank">Top 1</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="text-center">
                                        <img src="https://via.placeholder.com/100" class="rounded-circle">
                                        <div><strong>Redemption</strong></div>
                                        <div class="rank">Top 2</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="text-center">
                                        <img src="https://via.placeholder.com/100" class="rounded-circle">
                                        <div><strong>Baby Don't Go</strong></div>
                                        <div class="rank">Top 3</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="col-12 col-md-12 col-lg-6 col-xl-4">
                            <div class="top-tags col-12 card rounded-5 p-3 my-2 h-100 shadow">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5>Top Tags</h5>
                                <a href="#" class="text-white">All</a>
                            </div>
                            <div class="mb-2 position-relative">
                                <span class="tag-label">nagie</span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="mb-2 position-relative">
                                <span class="tag-label">rap-metal</span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 60%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>


            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser } from '@/api/users';
import API_URL from "@/utils/connection"; // 假设getUser函数在这个路径

export default {
    components: {},
    data() {
        return {
            user: null
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                const response = await getUser(); // 传递适当的参数
                this.user = response.data.data;
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },
        getAvatarUrl(avatarPath) {
            const baseUrl = API_URL;
            return avatarPath ? baseUrl + avatarPath : 'https://api.example.com/images/default-avatar.png';
        }
    },
}
</script>
