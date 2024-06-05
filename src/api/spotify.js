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

export const search = (keyword, type) => {
    return requestSpotify({
        url: `/api/search`,
        method: 'get',
        params: { q: keyword, type: type }
    });
};

export const getSpotifyTrackById = (id) => {
    return requestSpotify({
        url: `/api/getSpotifyTrackById`,
        method: 'get',
        params: { id }
    });
};


