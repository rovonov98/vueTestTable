<template>
  <div id="something">
      Does it work?
      <div>{{ someData }}</div>
  </div>

</template>

<script>
export default {
  name: 'SomeComponent',
  data() {
    return {
      someText: ''
    }
  },
  computed: {
    someData() {
      return this.$store.getters.getCounter
    }
  }
}
</script>

<style lang="scss">

</style>