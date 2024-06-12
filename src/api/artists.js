// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const getRecommArtist = params => request({
    url: `/app/getRecommArtist`,
    method: 'get',
    params
})

export const getArtist = artist => request({
    url: `/app/getArtist`,
    method: 'get',
    params: {id: artist}
})

export const getSimilarArtists = artist => request({
    url: `/app/getSimilarArtists`,
    method: 'get',
    params: {id: artist}
})

export const getArtistsByTags = tags => request({
    url: `/app/getArtistsByTags`,
    method: 'get',
    params: {tags: tags}
})

