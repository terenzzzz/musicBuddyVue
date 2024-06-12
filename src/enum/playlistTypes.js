const RECENTLY_PLAYED = "Recently Played";
const TOP_TRACKS = "Top Tracks";

const playlistTypes = (RECENTLY_PLAYED) => ({
    RECENTLY_PLAYED,
    TOP_TRACKS,

    playlistTypeToString: function (dataType) {
        switch (dataType) {
            case RECENTLY_PLAYED:
                return "recentlyPlayed";
            case TOP_TRACKS:
                return "topTracks";
            default:
                return "Unknown";
        }
    },

    stringToPlaylistType: function (str) {
        const reverseMap = Object.entries(this).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {
            [this.playlistTypeToString(RECENTLY_PLAYED)]: RECENTLY_PLAYED,
            [this.playlistTypeToString(TOP_TRACKS)]: TOP_TRACKS
        });

        return reverseMap[str] || "Unknown";
    },
});

module.exports = playlistTypes(RECENTLY_PLAYED);

