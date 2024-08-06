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
            colors: ['#0d6efccc', '#0d6efc99', '#0d6efc66', '#0d6efc33'],
            rotate: {from: -60, to: 60, numOfOrientation: 5},

        };
    },
    methods: {
        wordClickHandler() {

        },

    },
};
</script>
