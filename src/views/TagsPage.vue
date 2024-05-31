<template>
    <div class="Tags">
        <div class="row page-container mx-auto">
            <div class="col-4 col-md-3 col-xl-2 p-2" v-for="tag in tags" :key="tag.id">
                <div class="d-flex align-items-center justify-content-center bg-secondary text-white aspect-ratio-box">
                    <p class="m-0">{{ tag.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getAllTags} from "@/api/tags";


export default {
    components: {},
    data() {
        return {
            tags: []
        };
    },
    methods: {
        async fetchAllTags() {
            try {
                const response = await getAllTags();
                if (response.data.status === 200) {
                    this.tags = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        }
    },
    created() {
        this.fetchAllTags()
    }
}
</script>
<style>
.aspect-ratio-box {
    aspect-ratio: 1 / 1; /* 设置宽高比为1:1 */
}
</style>