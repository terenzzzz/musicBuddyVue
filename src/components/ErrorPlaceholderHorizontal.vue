<template>
    <div class="ErrorPlaceholder">
        <div class="row my-5">
            <div class="col mx-auto d-flex flex-row align-items-center justify-content-center text-center">
                <span class="fa-stack fa-2x ">
                    <i :class="icon"></i>
                </span>
                <h5 class="text-center">{{ title }}</h5>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: "No Data Founded"
        },
        icon: {
            type: String,
            required: false,
            default: "fa-solid fa-xmark"
        }
    },
}
</script>