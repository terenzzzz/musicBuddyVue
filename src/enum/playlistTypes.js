const RECENTLY_PLAYED = "Recently Played";

const playlistTypes = (RECENTLY_PLAYED) => ({
    RECENTLY_PLAYED,

    playlistTypeToString: function (dataType) {
        switch (dataType) {
            case RECENTLY_PLAYED:
                return "recentlyPlayed";
            default:
                return "Unknown";
        }
    },

    stringToPlaylistType: function (str) {
        const reverseMap = Object.entries(this).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, { [this.playlistTypeToString(RECENTLY_PLAYED)]: RECENTLY_PLAYED });

        return reverseMap[str] || "Unknown";
    },
});

module.exports = playlistTypes(RECENTLY_PLAYED);

