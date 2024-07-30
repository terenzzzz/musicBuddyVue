const TRACKS = "tracks";
const ARTISTS = "artists";
const LYRICS = "lyrics";



const searchTypes = () => ({
    TRACKS,
    ARTISTS,
    LYRICS,


    searchTypeToString: function (dataType) {
        switch (dataType) {
            case TRACKS:
                return "tracks";
            case ARTISTS:
                return "artists";
            case LYRICS:
                return "lyrics";
            default:
                return "Unknown";
        }
    },

    stringToSearchType: function (str) {
        const reverseMap = Object.entries(this).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {
            [this.playlistTypeToString(TRACKS)]: TRACKS,
            [this.playlistTypeToString(ARTISTS)]: ARTISTS,
            [this.playlistTypeToString(LYRICS)]: LYRICS,
        });

        return reverseMap[str] || str;
    },
});

module.exports = searchTypes();

