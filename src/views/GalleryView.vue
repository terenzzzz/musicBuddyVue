<template>
    <div>
        <div class="row ">
            <div class="col-12 d-flex justify-content-center">
                    <span :class="{'red-text': showKitty, 'gochi-hand-regular': true, 'fs-1': true}"  v-on:click="toggleView">Kitty
                    </span> 
                    <span class="fs-3 mx-3">|</span>
                    <span :class="{'red-text': !showKitty, 'gochi-hand-regular': true, 'fs-1': true}" v-on:click="toggleView">Cocktail</span>
                </div>
        </div>
        


        <Waterfall :list="kittyList" v-show="showKitty">
            <template #item="{item, url, index}">
                <div class="card">
                    <LazyImg :url="url" class="card-img-top"/>
                    <div class="card-footer text-body-secondary text-center gochi-hand-regular">
                        {{ item.date }}
                    </div>
                </div>
            </template>
        </Waterfall>

        <Waterfall :list="cockTailList" v-show="!showKitty">
            <template #item="{item, url, index}">
                <div class="card gochi-hand-regular">
                    <LazyImg :url=item.img class="card-img-top"/>
                    <div class="card-body ">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="text-muted text-center my-3 recipe">{{ item.recipe }}</p>
                        <p class="text-muted mb-0"><i class="bi bi-geo-alt me-1"></i>{{ item.location }}</p>
                    </div>
                    <div class="card-footer text-body-secondary text-center ">
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
            cockTailList: [
                {name:"NewYork Sour",recipe:"Whisky / Port / Lemon / Syrup;",img:require('@/assets/cocktail/240420.jpg'),date:"2024-04-20",location:"Homemade"},
                {name:"BLINKER",recipe:"blending rye / grapefruit / blending rye;",img:require('@/assets/cocktail/240414.jpg'),date:"2024-04-14",location:"BLINKER 70 Spring Gardens, Manchester M2 2BQ"},
                {name:"Pink Peach Tree & Golden Delicious",recipe:"The Macallan DC 12 Scotch / Peach / montillado Sherry / Bitters; \n Calvados / Honey / Lemon;",img:require('@/assets/cocktail/240413.jpg'),date:"2024-04-13",location:"SCHOFIELD's Sunlight House, 3 Little Quay Street, Manchester, M3 3JZ"},
                {name:"Blood Orange and YUZU Cosmo & Lyche and Cranberry Fizz",recipe:"Malfy arancia / YUZU sake / Lime / Vanilla / Cranberry; \n Kwai feh lyche / cranberry / lemon / prosecco;",img:require('@/assets/cocktail/240407.jpg'),date:"2024-04-07",location:"Proove, 16-17 ORCHARD SQ, SHEFFIELD, S1 2FB"},
                {name:"BLOCKBUSTER",recipe:"GIN / Fennel / Plum wine / peach / Bubbles;",img:require('@/assets/cocktail/240406.jpg'),date:"2024-04-06",location:"Murder, 36 HANWAY STREET, LONDON, W1T 1UP"},
                {name:"MANGO",recipe:"Toki Whisky / Lacto Fermented Roasted / Green Mango / Ancho Reyes Verde;",img:require('@/assets/cocktail/240405.jpg'),date:"2024-04-05",location:"SOMA, 14 Denman St, London W1D 7HJ"},
                {name:"Bee's knees",recipe:"Gin / Lemon / Honey;",img:require('@/assets/cocktail/240207.jpg'),date:"2024-02-07",location:"Homemade"},
                {name:"PALOMA & RASPBERRY",recipe:"Grapefruit / Tequila / Lime \n Raspvetty / Gin / Bubbles;",img:require('@/assets/cocktail/240131.jpg'),date:"2024-01-31",location:"PASSING FANCIES, 30 Gibb Street, The Custard Factory, B94BF "},
                {name:"Plum Together",recipe:"Roku Japanese gin / Akashi-Tai plum sake, cherry syrup / tartaric acid / plum bitters / Tartarashi chilli rim;",img:require('@/assets/cocktail/240118.jpg'),date:"2024-01-18",location:"The Public, Surrey Street, Sheffield, S1 2LG"},
                {name:"Million Dollar Bounty",recipe:"Coconut oil-washed Johnny Walker Black Label whisky / Koko Kanu rum / Giffard Crème de Cacao / Miso demerara syrup / chocolate bitters",img:require('@/assets/cocktail/231105.jpg'),date:"2023-11-05",location:"The Public, Surrey Street, Sheffield, S1 2LG"},
                {name:"Pornstart Matini",recipe:"Smirnoff vanilla vodka, passoa / pineapple juice / lime juice / passionfruit puree / sugarsyrup / served with a shot of Prosecco;",img:require('@/assets/cocktail/231117.jpg'),date:"2023-11-17",location:"Colonel Porter's Emporium, Milburn House, Dean St, Newcastle upon Tyne NE1 1LF"},
                {name:"Yoko Ob-yes",recipe:"Galangal / Agave / Genmaicha Tea / Yuzu Sake / Suze / Acid / Peated Olive Oil;",img:require('@/assets/cocktail/231223.jpg'),date:"2023-12-23",location:"The Absent Ear, Brunswick St, Glasgow G1 1TF"},
                {name:"Nola",recipe:"",img:require('@/assets/cocktail/231227.jpg'),date:"2023-12-27",location:"Nola, 39 Union St, Dundee DD1 4BS"},
                {name:"Draffens",recipe:"",img:require('@/assets/cocktail/231228.jpg'),date:"2023-12-28",location:"Draffens, Couttie's Wynd, Dundee DD1 4ET"},
                {name:"Long Island iced tea",recipe:"Vodka / Gin / Tequila / Rum / Cointreau / Lime / Cola / Syrup",img:require('@/assets/cocktail/231020.jpg'),date:"2023-10-22",location:"Homemade"},
                {name:"Ice Breaker",recipe:"Agave / Cointreau / Grapefruit / Grenadine Syrup;",img:require('@/assets/cocktail/231017.jpg'),date:"2023-10-17",location:"Homemade"},
                {name:"Whiskey sour",recipe:"Whisky / Lemon / Syrup",img:require('@/assets/cocktail/231005.jpg'),date:"2023-10-05",location:"Homemade"},
            ]
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
            this.kittyList.unshift({
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

.recipe {
  white-space: pre-line; /* 或者使用 pre-wrap */
}
</style>