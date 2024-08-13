<template >
    <router-link v-if="tag._id" :to="{ name: 'playlist', params: { type: tag._id } }">
        <button class="rounded-3 btn btn-secondary my-1">{{ tag.name }}</button>
    </router-link>
    <button v-else class="rounded-3 btn btn-secondary my-1" disabled>{{ tag.name }}</button>
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