<template>
    <div class="d-flex flex-row justify-content-center align-items-center">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <h5 class="ms-3"> {{title}} </h5>
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
};
</script>