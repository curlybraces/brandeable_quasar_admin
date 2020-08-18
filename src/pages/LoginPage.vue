<template>
  <q-page class="justify-center text-center">
    <q-card bordered class="q-gutter-md q-ma-md content-center" style="width: 350px">
      <q-card-section>
        <q-input dense label="Usuario" v-model="usuario"></q-input>
        <q-input dense label="Password" type="password" v-model="password"></q-input>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn @click="iniciarSesion" color="primary">Iniciar sesión</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      usuario: '',
      password: ''
    }
  },
  methods: {
    async iniciarSesion() {

      var form = new FormData()
      form.append("name", this.usuario)
      form.append("password", this.password)
      var data = await this.$axios.post('/api/login', form)
      console.log(data);
      if (data.status===200){
      alert("se ha logeado")
      }else
        alert("Error")

      this.$q.localStorage.set("token","Bearer "+data.token)
    }
  }
}
</script>

<style scoped>

</style>
