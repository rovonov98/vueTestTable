<template>
  <div class="person">
    <p>Выбран пользователь <b>{{ this.person.firstName + ' ' + this.person.lastName}}</b></p>
    <div v-if="this.person.description">
      <p>Описание: </p>
      <textarea :placeholder="person.description" disabled>
      </textarea>
    </div>
    <p v-if="this.person.address">Адрес проживания: <b>{{ this.person.address.streetAddress }}</b></p>
    <p v-if="this.person.address">Город: <b>{{ this.person.address.city }}</b></p>
    <p v-if="this.person.address">Провинция/штат: <b>{{ this.person.address.state }}</b></p>
    <p v-if="this.person.address">Индекс: <b>{{ this.person.address.zip }}</b></p>
  </div>
</template>

<script>
export default {
  name: 'Person',
  props: {
    person: Object
  },
}
</script>

<style lang="scss">
.person {
  padding: 1rem;
  box-shadow: 0 0 1rem -.1rem rgba(191, 191, 191, 1);
}
textarea {
  padding: .5rem;
  background: #FFF;
  color: #000;
  font-size: 1rem;
  width: 100%;
  resize: none;
  min-height: 10rem;
}
</style>


