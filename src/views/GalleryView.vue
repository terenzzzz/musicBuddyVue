<template>
    <div>
        <Waterfall :list="list" :width="250">
            <template #item="{item, url, index}">
                <div class="card">
                    <LazyImg :url="url" class="card-img-top"/>
                    <div class="card-footer text-body-secondary text-center gochi-hand-regular">
                        {{ item.date }}
                    </div>
                </div>
            </template>
        </Waterfall>
    </div>
</template>

<script>

import { LazyImg, Waterfall } from 'vue-waterfall-plugin'
import 'vue-waterfall-plugin/dist/style.css'

export default {

    components: {
        Waterfall,LazyImg
    },

    data() {
        return {
            list: []
        };
    },
    created() {
        //使用require.context动态导入图片
        const files = require.context('@/assets/kitty', false, /\.jpg$/); // 这里假设你的图片格式为png，可以根据实际情况修改正则表达式
        // 使用正则表达式匹配文件名中的日期部分，并将其转换为指定格式的日期字符串
        const dateRegex = /(\d{2})(\d{2})(\d{2})\.jpg/;
        files.keys().forEach(key => {
            const fileName = key.match(dateRegex);
            if (fileName) {
            const year = '20' + fileName[1];
            const month = fileName[2];
            const day = fileName[3];
            const dateString = `${year}-${month}-${day}`;
            
            // 添加到list数组中
            this.list.push({
                date: dateString,
                src: files(key)
            });
            }
        });
    }
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');

.gochi-hand-regular {
  font-family: "Gochi Hand", cursive;
  font-weight: 400;
  font-style: normal;
}

</style>