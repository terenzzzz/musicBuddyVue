<template>
    <div>

        <div class="row m-0">
            <div class="col-12 justify-content-center row m-0"> 
                <div class="col-6 col-md-4 col-lg-3 col-xl-2 border-end row text-center m-0 p-2 justify-content-center " v-on:click="toggleView">
                    <div class="col-3 my-auto">
                        <img src="../assets/logo/kitty.png" class="img-fluid" > 
                    </div>
                    
                    <p class="col-3 my-auto p-0 gochi-hand-regular fs-1">Kitty</p> 
                </div>

                <div class="col-6 col-md-4 col-lg-3 col-xl-2 row text-center m-0 p-2 justify-content-center " v-on:click="toggleView">
                    <div class="col-3 my-auto">
                        <img src="../assets/logo/cocktail.png" class="img-fluid" > 
                    </div>
                    
                    <p class="col-3 my-auto p-0 gochi-hand-regular fs-1">Cocktail</p> 
                </div>
            </div>
        </div>


        <Waterfall :list="kittyList" :width="250" v-show="showKitty">
            <template #item="{item, url, index}">
                <div class="card">
                    <LazyImg :url="url" class="card-img-top"/>
                    <div class="card-footer text-body-secondary text-center gochi-hand-regular">
                        {{ item.date }}
                    </div>
                </div>
            </template>
        </Waterfall>

        <Waterfall :list="cockTailList" :width="250" v-show="!showKitty">
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

    methods: {
        toggleView(){
            this.showKitty == true ? this.showKitty = false : this.showKitty = true
        }
    },

    data() {
        return {
            showKitty: true,
            kittyList: [],
            cockTailList: []
        };
    },
    created() {
        //使用require.context动态导入图片
        const files = require.context('@/assets/kitty', false, /\.jpg$/); 
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
            this.kittyList.push({
                date: dateString,
                src: files(key)
            });
            }
        });

        //使用require.context动态导入图片
        const cocktailFiles = require.context('@/assets/cocktail', false, /\.jpg$/); 
        // 使用正则表达式匹配文件名中的日期部分，并将其转换为指定格式的日期字符串
        cocktailFiles.keys().forEach(key => {
            const fileName = key.match(dateRegex);
            if (fileName) {
            const year = '20' + fileName[1];
            const month = fileName[2];
            const day = fileName[3];
            const dateString = `${year}-${month}-${day}`;
            
            // 添加到list数组中
            this.cockTailList.push({
                date: dateString,
                src: cocktailFiles(key)
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