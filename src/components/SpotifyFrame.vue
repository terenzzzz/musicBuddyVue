<template>
    <div>
        <div id="embed-iframe"></div>
    </div>
</template>

<script>
export default {
    props: {
        uri: {
            type: String,
            required: true,
            default: ""
        },
        autoPlay:{
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            IFrameAPI: null,
            EmbedController: null,
        };
    },
    watch: {
        uri() {
            this.fetchTrackById();
        }
    },
    mounted() {
        this.initializeSpotifyAPI();
    },
    methods: {
        initializeSpotifyAPI() {
            if (window.onSpotifyIframeApiReady) {
                // Spotify API might already be ready
                window.onSpotifyIframeApiReady = (IFrameAPI) => {
                    this.IFrameAPI = IFrameAPI;
                    this.createController();
                };
            } else {
                // Wait for the Spotify API to load
                window.onSpotifyIframeApiReady = (IFrameAPI) => {
                    this.IFrameAPI = IFrameAPI;
                    this.createController();
                };
            }
        },
        createController() {
            this.$nextTick(() => {
                const element = document.getElementById('embed-iframe');
                if (!element || !this.IFrameAPI) return;

                const options = {
                    width: '100%',
                    height: '100',
                    uri: this.uri
                };
                const callback = (EmbedController) => {
                    this.EmbedController = EmbedController;
                };
                this.IFrameAPI.createController(element, options, callback);
            });
        },
        fetchTrackById() {
            if (!this.EmbedController) {
                // If EmbedController is not yet available, create the controller again
                this.createController();
            }
            this.EmbedController.loadUri(this.uri);
            if (this.autoPlay){
                this.play()
            }
        },
        play() {
            if (this.EmbedController) {
                this.EmbedController.play();
                this.playing = true;
            }
        },

    }
};
</script>
