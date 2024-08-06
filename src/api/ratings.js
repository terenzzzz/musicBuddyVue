// 导入 axios配置
import request from "@/utils/request"

const TRACK='Track'
const ARTIST='Artist'

export const itemTypes = {
    TRACK,
    ARTIST
};

export const deleteRating = (item, itemType) => request({
    url: `/app/deleteRating`,
    method: 'post',
    data: {
        item: item,
        itemType: itemType
    }
});


export const addRating = async (item, itemType, rate) => {
    const formData = new FormData();
    formData.append('item', item);
    formData.append('itemType', itemType);
    formData.append('rate', rate);

    try {
        const response = await request({
            url: `/app/addRating`,
            method: 'post',
            data: formData
        });
        return response.data;
    } catch (error) {
        console.error('Error in addRating:', error);
        throw error;
    }

}

export const getRating = (item, itemType) => request({
    url: `/app/getRating`,
    method: 'get',
    params: {item, itemType}
})

export const getRatings = (isStatWords) => request({
    url: `/app/getRatings`,
    method: 'get',
    params:{
        isStatWords: isStatWords==="true" || isStatWords === "false"? isStatWords : "",
    }
})
