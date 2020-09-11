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

        <q-dialog
          v-model="dialogo"

        >
          <q-card style="width: 300px">
            <q-card-section>
              <div class="text-h6">Small</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Click/Tap on the backdrop.
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
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
      password: '',
      dialogo: false,
    }
  },
  methods: {
    async iniciarSesion() {

      var form = new FormData()
      form.append("user", this.usuario)
      form.append("password", this.password)
      var {data} = await this.$axios.post('/api/login', form)
      console.log(data);
      if (data.token) {
        this.dialogo=true
        this.$q.localStorage.set("token", "Bearer " + data.token)
        // this.$router.push("main")

      } else
        alert("Datos incorrectos, verificar.")

    },


  }
}
</script>

<style scoped>

</style>
