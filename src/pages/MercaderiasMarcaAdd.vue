<template>
    <q-page padding>
        <!-- Filters-->
        <div class="q-pa-md">
            <div class="row">
                <div class="col-md-12">
                    <q-input outlined v-model="Marca.nombre" label="Nombre" />
                </div>
                <br/>
                <q-btn :label="btnName" color="primary" @click="crearOrModificarMarca"></q-btn>
             </div>
        </div>
    </q-page>
</template>

<script>
export default {

  createOrUpdate: 'create',
  btnName: 'Crear',

  data () {
    console.log(this.$route.params)
    if (this.$route.params === null) {
      this.createOrUpdate = 'create'
    } else {
      this.btnName = 'Modificar'
      this.createOrUpdate = 'update'
      this.getMarca(this.$route.params.id)
    }
    return {
      Marca: {
        id: '',
        nombre: ''
      }
    }
  },

  methods: {
    getMarca (id) {
      console.log(id)
      this.$axios.get('http://localhost:8000/api/mercaderias_marcas/' + id)
        .then((res) => {
          console.log('Mercaderias Items', res)
          this.Marca = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    crearOrModificarMarca () {
      if (this.createOrUpdate === 'create') {
        this.$axios.post('http://localhost:8000/api/mercaderias_marcas', this.Marca)
          .then((res) => {
            console.log('Mercaderias Items', res)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$axios.put('http://localhost:8000/api/mercaderias_marcas/' + this.Marca.id, this.Marca)
          .then((res) => {
            console.log('Mercaderias Items', res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>
