<template>
  <div class="wrapper">
    <div>
      <button class="button" @click="toggleAddForm">Добавить</button>
    </div>
    <form v-show="addForm" class="person" @submit.prevent="addPerson">
      <div>
        <div class="">
          <span>id</span>
          <input 
            type="text" 
            @keyup="newPerson.id = newPerson.id.replace(/[^\d]/g,'')"
            v-model="newPerson.id"
          >
        </div>
        <div class="">
          <span>firstName</span>
          <input type="text" v-model="newPerson.firstName">
        </div>
        <div class="">
          <span>lastName</span>
          <input type="text" v-model="newPerson.lastName">
        </div>
        <div class="">
          <span>email</span>
          <input type="email" v-model="newPerson.email">
        </div>
        <div class="">
          <span>phone</span>
          <input type="text" v-model="newPerson.phone">
        </div>
      </div>
      <button class="button" value="Submit">Добавить в таблицу</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPerson: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      addForm: false
    }
  },
  methods: {
    addPerson() {
      this.$emit('addNewPerson', { ...this.newPerson })
      this.toggleAddForm()
    },
    toggleAddForm() {
      this.addForm = !this.addForm
    }
  }
}
</script>

<style lang="scss">

</style>