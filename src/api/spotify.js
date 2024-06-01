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


