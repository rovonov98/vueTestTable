<template>
  <div class="person">
    <p>Выбран пользователь <b>{{ this.person.firstName + ' ' + this.person.lastName}}</b></p>
    <p>Описание: </p>
    <p>
      <textarea :placeholder="person.description" disabled>
      </textarea>
    </p>
    <p>Адрес проживания: <b>{{ this.person.address.streetAddress }}</b></p>
    <p>Город: <b>{{ this.person.address.city }}</b></p>
    <p>Провинция/штат: <b>{{ this.person.address.state }}</b></p>
    <p>Индекс: <b>{{ this.person.address.zip }}</b></p>
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
  background: #FFF;
  color: #000;
  font-size: 1rem;
  width: 100%;
  resize: none;
}
</style>


