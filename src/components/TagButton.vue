<template>
    <router-link :to="{ name: 'playlist',
                            params: { type:tag._id } }">
        <button class="rounded-3 btn btn-secondary my-1">{{ tag.name }}</button>
    </router-link>
</template>

<script>
export default {
    components: {},
    props:{
      tag:{
          type: Object,
          required: true
      }
    },
    methods: {},
}
</script>