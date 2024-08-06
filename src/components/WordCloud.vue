<template>
    <div id="wordcloud" class="bg-white">
        <wordcloud
            :data="words"
            :rotate="rotate"
            spiral="rectangular"
            nameKey="word"
            valueKey="value"
            :color="colors"
            :margin="{top: 0, right: 0, bottom: 0, left: 0 }"
            :showTooltip="false"
            :wordClick="wordClickHandler"
        ></wordcloud>


    </div>
</template>

<script>
import wordcloud from 'vue-wordcloud';

export default {
    components: {
        wordcloud,
    },
    props: {
        words: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            default: "WordCloud"
        }
    },
    data() {
        return {
            colors: ['#0d6efd', '#0d6efdd9', '#0d6efdbf', '#0d6efda1'],
            rotate: {from: -60, to: 60, numOfOrientation: 5},

        };
    },
    methods: {
        wordClickHandler() {

        },

    },
};
</script>
