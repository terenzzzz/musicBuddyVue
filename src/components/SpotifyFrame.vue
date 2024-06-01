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
            required: true
        }
    },
    data() {
        return {
            IFrameAPI: null,
            EmbedController: null
        };
    },
    watch: {
        uri() {
            this.fetchTrackById();
        }
    },
    mounted() {
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            this.IFrameAPI = IFrameAPI;
            this.createController();
        };
    },
    methods: {
        createController() {
            this.$nextTick(() => {
                const element = document.getElementById('embed-iframe');
                if (!element) return;

                const options = {
                    width: '100%',
                    height: '160',
                    uri: this.uri
                };
                const callback = (EmbedController) => {
                    this.EmbedController = EmbedController;
                    document.querySelectorAll('.episode').forEach(
                        episode => {
                            episode.addEventListener('click', () => {
                                EmbedController.loadUri(episode.dataset.spotifyId);
                            });
                        }
                    );
                };
                this.IFrameAPI.createController(element, options, callback);
            });
        },
        fetchTrackById() {
            if (this.EmbedController) {
                this.EmbedController.loadUri(this.uri);
            } else {
                // If EmbedController is not yet available, create the controller again
                this.createController();
            }
        }
    }
};
</script>
