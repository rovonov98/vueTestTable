<template>
  <div class="wrapper">
    <div>
      <button class="button" @click="toggleAddForm">Добавить</button>
    </div>
    <form 
      v-show="addForm" 
      class="person" 
      @submit.prevent="addPerson"
    >
      <div>
        <div class="new-person-form__fields">
          <span>id</span>
          <input 
            class="input"
            type="number"
            v-model="newPerson.id" 
            placeholder="1"
            required
          >
        </div>
        <div class="new-person-form__fields">
          <span>firstName</span>
          <input 
            class="input"
            type="text" 
            v-model="newPerson.firstName" 
            pattern="[A-Za-z]{1,15}" 
            placeholder="Ivan"
            required
          >
        </div>
        <div class="new-person-form__fields">
          <span>lastName</span>
          <input 
            class="input"
            type="text"
            v-model="newPerson.lastName"
            placeholder="Ivanov"
            pattern="[A-Za-z]{1,15}" 
            required
          >
        </div>
        <div class="new-person-form__fields">
          <span>email</span>
          <input 
            class="input" 
            type="email" 
            v-model="newPerson.email"
            placeholder="something@gmail.com"
            required
          >
        </div>
        <div class="new-person-form__fields">
          <span>phone</span>
          <input 
            class="input" 
            type="text" 
            v-model="newPerson.phone" 
            pattern=".\d{3}.\d{3}.\d{4}" 
            placeholder="(123)456-7890"
            required
          >
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
      addForm: false,
      phoneLength: 13
    }
  },
  methods: {
    addPerson() {
      this.newPerson.id = parseInt(this.newPerson.id, 10)
      this.$emit('addNewPerson', { ...this.newPerson })
      this.toggleAddForm()
      this.newPerson.id = '',
      this.newPerson.firstName = '',
      this.newPerson.lastName = '',
      this.newPerson.email = '',
      this.newPerson.phone = ''
    },
    toggleAddForm() {
      this.addForm = !this.addForm
    },
    validateNames(name) {
      this.newPerson[name] = 
      this.newPerson[name].charAt(0).toUpperCase().replace(/[^A-Za-z]+/g, '') + 
      this.newPerson[name].slice(1).toLowerCase().replace(/[^A-za-z]+/g, '')
    },
  },
  computed: {
    phone() {
      return this.newPerson.phone
    },
    firstName() {
      return this.newPerson.firstName
    },
    lastName() {
      return this.newPerson.lastName
    },
    id() {
      return this.newPerson.id
    }
  },
  watch: {
    phone() {
      this.newPerson.phone = this.newPerson.phone.replace(/[^0-9]/g, '')
        .replace(/^(\d{3})(\d{3})?(\d{4})?/g, '($1)$2-$3')
        .substr(0, this.phoneLength)
    },
    firstName() {
      this.validateNames('firstName') 
    },
    lastName() {
      this.validateNames('lastName')
    },
    id() {
      this.newPerson.id = this.newPerson.id.replace(/[^0-9]/g, '')
    }
  }
}
</script>

<style lang="scss">
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none; 
}
input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}
.new-person-form__fields {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>