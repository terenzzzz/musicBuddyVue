// 导入 axios配置
import requestSpotify from "@/utils/requestSpotify"

export const refreshToken = params => requestSpotify({
    url: `/api/spotifyRefreshToken`,
    method: 'get',
    params
});

export const getRecentlyPlayed = params => requestSpotify({
    url: `/api/getRecentlyPlayed`,
    method: 'get',
    params
});

export const getTopTracks = params => requestSpotify({
    url: `/api/getTopTracks`,
    method: 'get',
    params
});

export const getTopArtists = params => requestSpotify({
    url: `/api/getTopArtists`,
    method: 'get',
    params
});

export const searchSpotify = (keyword, type) => {
    return requestSpotify({
        url: `/api/search`,
        method: 'get',
        params: { q: keyword, type: type } //type: track/artist
    });
};

export const getSpotifyTrackById = (id) => {
    return requestSpotify({
        url: `/api/getSpotifyTrackById`,
        method: 'get',
        params: { id }
    });
};

export const getSpotifyArtistById = (id) => {
    return requestSpotify({
        url: `/api/getSpotifyArtistById`,
        method: 'get',
        params: { id }
    });
};

export const getArtistRelatedArtists = (id) => {
    return requestSpotify({
        url: `/api/getArtistRelatedArtists`,
        method: 'get',
        params: { id }
    });
};


