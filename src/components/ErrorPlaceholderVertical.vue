<template>
    <div class="ErrorPlaceholder">
        <div class="row my-5">
            <div class="col-8 mx-auto d-flex justify-content-center">
                <span class="fa-stack fa-5x text-center">
                    <i :class="icon"></i>
                </span>
            </div>
            <h5 class="text-center">{{ title }}</h5>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: "No Data Found"
        },
        icon: {
            type: String,
            required: false,
            default: "fa-solid fa-xmark"
        }
    },
}
</script>