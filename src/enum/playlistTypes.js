const RECENTLY_PLAYED = "Recently Played";
const SAVED_TRACKS = "Saved Tracks";
const TOP_TRACKS = "Top Tracks";
const TOP_ARTISTS = "Top Artists";
const RATED_TRACKS = "Rated Tracks";
const RATED_ARTISTS = "Rated Artists";


const playlistTypes = (RECENTLY_PLAYED) => ({
    RECENTLY_PLAYED,
    SAVED_TRACKS,
    TOP_TRACKS,
    TOP_ARTISTS,
    RATED_TRACKS,
    RATED_ARTISTS,

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
            case RATED_TRACKS:
                return "ratedTracks";
            case RATED_ARTISTS:
                return "ratedArtists";
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
            [this.playlistTypeToString(RATED_TRACKS)]: RATED_TRACKS,
            [this.playlistTypeToString(RATED_ARTISTS)]: RATED_ARTISTS,
        });

        return reverseMap[str] || str;
    },
});

module.exports = playlistTypes(RECENTLY_PLAYED);

