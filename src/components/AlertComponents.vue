<template>
    <div class="alert text-center alert-secondary" role="alert">
        {{ title }}
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
    },

};
</script>