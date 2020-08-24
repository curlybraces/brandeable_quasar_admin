<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
                <div class="row">
                  <div class="col-md-8 offset-md-2">
                      <q-input class="espacio" standout  outlined label="Estado"  v-model="Notificacion.estado"/>
                  </div>
                  <div class="col-md-8 offset-md-2">
                      <q-input class="espacio" outlined label="Mensaje"  type="textarea"  v-model="Notificacion.resumen"/>
                  </div>
                  <div class="col-md-8 offset-md-2">
                      <q-input class="espacio" outlined label="Numero"  v-model="Notificacion.entidad"/>
                  </div>
                </div>
            <div class="row">
              <div class="col-md-10 offset-md-2">
                <q-btn @click="crateOrUpdate" color="primary" label="Guardar" v-close-popup/>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: function () {
    this.isEditOrUpdate(this.$route.params.id)
    return {
      Notificacion: {
        id: '',
        estado: '',
        resumen: '',
        entidad: '',
      },

      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      pagination: {
        rowsPerPage: 10
      }
    }
  },

 
  methods: {
    async rowClick (e, row) {
      this.statecard = true
      console.log(row)
      this.card.dni = row.dni
      this.card.nombre = row.paciente
      this.card.diagnostico = row.diagnostico
      this.card.fecha = row.creado
      this.card.ruta_voucher = this.$axios.defaults.baseURL + '/' + row.archivo
    },
     isEditOrUpdate(id){
        if (this.$route.params === null) {
            this.createOrUpdate = 'create'
        } else {
            this.btnName = 'Modificar'
            this.createOrUpdate = 'update'
            this.getNotificacion(id)
        }
    },
    getNotificacion (id) {
      console.log("id"+id)
      this.$axios.get('api/notificacion/' + id)
        .then((res) => {
          this.Notificacion = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editNotificacion (prop) {
      this.$axios.get('api/directorio_categorias/' + prop.row.id)
        .then((res) => {
          console.log(res)
          this.Categoria.id = res.data.id
          this.Categoria.nombre = res.data.nombre
        })
        .catch((err) => {
          console.log(err)
        })
      this.dialog = true
      this.createOrUpdate = 'update'
    },
    async goToPage (page) {
      this.page = page
      this.loading = true
      var { data } = await this.$axios.post('api/get-all-radio?page=' + page, {
        descripcion: this.descripcion,
        nombre: this.nombres,
        dni: this.dni,
        fecha_from: this.op_fecha_from,
        fecha_to: this.op_fecha_to
      })
      this.page = data.current_page
      // this.totalPages=Number(data.last_page_url.slice(-1));
      console.log(data)
      this.loading = false
      this.nextPage = Number(data.next_page_url ? data.next_page_url.slice(-1) : 1)
      this.prevPage = Number(data.prev_page_url ? data.prev_page_url.slice(-1) : 1)
      this.totalPages = Number(data.last_page_url ? data.last_page_url.slice(-1) : 1)
      this.rows = data.data
    },
    crateOrUpdate () {
      if (this.createOrUpdate === 'create') {
        this.guardar()
      } else {
        this.update()
      }
    },
    guardar () {
      console.log('guardar')
      this.$axios.post('api/notificacion', this.Notificacion)
        .then((res) => {
          console.log(res)
          redirect('/')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update () {
      console.log('update')
      this.$axios.put('api/notificacion/' + this.Notificacion.id, this.Notificacion)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
  .espacio{
    padding: 5px;
  }
</style>
