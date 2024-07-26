// 导入 axios配置
import request from "@/utils/request"


export const getCollaborateSimilarUsersTracks = (user) => request({
    url: `/api/getCollaborateSimilarUsersTracks`,
    method: 'post',
    data: { user: user }
});

export const getTfidfRecommendArtistsByLyrics = (lyrics) => request({
    url: `/api/getTfidfRecommendArtistsByLyrics`,
    method: 'post',
    data: { lyrics: lyrics }
});

export const getW2VRecommendArtistsByLyrics = (lyrics) => request({
    url: `/api/getW2VRecommendArtistsByLyrics`,
    method: 'post',
    data: { lyrics: lyrics }
});

export const getLDARecommendArtistsByLyrics = (lyrics) => request({
    url: `/api/getLDARecommendArtistsByLyrics`,
    method: 'post',
    data: { lyrics: lyrics }
});

export const getWeightedRecommendArtistsByLyrics = (lyrics,tfidf_weight, w2v_weight, lda_weight) => request({
    url: `/api/getWeightedRecommendArtistsByLyrics`,
    method: 'post',
    data: { lyrics,
        tfidf_weight,
        w2v_weight,
        lda_weight}
});

export const getTfidfRecommendArtistsByArtist = (artist) => request({
    url: `/api/getTfidfRecommendArtistsByArtist`,
    method: 'post',
    data: { artist: artist }
});

export const getW2VRecommendArtistsByArtist = (artist) => request({
    url: `/api/getW2VRecommendArtistsByArtist`,
    method: 'post',
    data: { artist: artist }
});

export const getLDARecommendArtistsByArtist = (artist) => request({
    url: `/api/getLDARecommendArtistsByArtist`,
    method: 'post',
    data: { artist: artist }
});

export const getWeightedRecommendArtistsByArtist = (artist,tfidf_weight, w2v_weight, lda_weight) => request({
    url: `/api/getWeightedRecommendArtistsByArtist`,
    method: 'post',
    data: { artist,
        tfidf_weight,
        w2v_weight,
        lda_weight}
});

export const getTfidfRecommendByLyrics = (lyric) => request({
    url: `/api/getTfidfRecommendByLyrics`,
    method: 'post',
    data: { lyric: lyric }
});

export const getW2VRecommendByLyrics = (lyric) => request({
    url: `/api/getW2VRecommendByLyrics`,
    method: 'post',
    data: { lyric: lyric }
})

export const getLDARecommendByLyrics = (lyric) => request({
    url: `/api/getLDARecommendByLyrics`,
    method: 'post',
    data: { lyric: lyric }
})

export const getWeightedRecommendByLyrics = (lyric,tfidf_weight, w2v_weight, lda_weight) => request({
    url: `/api/getWeightedRecommendByLyrics`,
    method: 'post',
    data: {
        lyric,
        tfidf_weight,
        w2v_weight,
        lda_weight,
    }
})


export const getTfidfRecommendByTrack = (track) => request({
    url: `api/getTfidfRecommendByTrack`,
    method: 'get',
    params: {track: track}
})

export const getW2VRecommendByTrack = (track) => request({
    url: `api/getW2VRecommendByTrack`,
    method: 'get',
    params: {track: track}
})

export const getLdaRecommendByTrack = (track) => request({
    url: `api/getLdaRecommendByTrack`,
    method: 'get',
    params: {track: track}
})

export const getWeightedRecommendByTrack = (track) => request({
    url: `api/getWeightedRecommendByTrack`,
    method: 'get',
    params: {track: track}
})


export const get2dModel = params => request({
    url: `/api/get2dModel`,
    method: 'get',
    params
})

