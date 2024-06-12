const RECENTLY_PLAYED = "Recently Played";
const SAVED_TRACKS = "Saved Tracks";
const TOP_TRACKS = "Top Tracks";
const TOP_ARTISTS = "Top Artists";

const playlistTypes = (RECENTLY_PLAYED) => ({
    RECENTLY_PLAYED,
    SAVED_TRACKS,
    TOP_TRACKS,
    TOP_ARTISTS,

    playlistTypeToString: function (dataType) {
        switch (dataType) {
            case RECENTLY_PLAYED:
                return "recentlyPlayed";
            case SAVED_TRACKS:
                return "savedTracks";
            case TOP_TRACKS:
                return "topTracks";
            case TOP_ARTISTS:
                return "topArtists";
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
            [this.playlistTypeToString(SAVED_TRACKS)]: SAVED_TRACKS,
            [this.playlistTypeToString(TOP_TRACKS)]: TOP_TRACKS,
            [this.playlistTypeToString(TOP_ARTISTS)]: TOP_ARTISTS,
        });

        return reverseMap[str] || "Unknown";
    },
});

module.exports = playlistTypes(RECENTLY_PLAYED);

