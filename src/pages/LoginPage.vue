<template>
  <q-layout>
    <q-page-container >
      <q-page >
        <q-card bordered class="absolute-center " style="width: 350px;height: 350px">
          <q-card-section>
            <q-input v-model="usuario" dense label="Usuario"></q-input>
            <q-input v-model="password" dense label="Password" type="password"></q-input>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="primary" @click="iniciarSesion">Iniciar sesión</q-btn>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
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
      form.append("user", this.usuario)
      form.append("password", this.password)
      var {data} = await this.$axios.post('/api/login', form)
      console.log(data);
      if (data.token ) {
        alert("se ha logeado")
        this.$q.localStorage.set("token", "Bearer " + data.token)
        this.$router.push("main")
      } else
        alert("Datos incorrectos, verificar.")

    },


  }
}
</script>

<style scoped>

</style>
