<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
            <div class="row">
                  <div class="col-md-6">
                      <q-select outlined v-model="selected_tipo" map-options class="espacio" standout :options="tipos" label="Tipo" />
                  </div>
                  <div class="col-md-6">
                      <q-input class="espacio" outlined label="Nombre" v-model="Presentacion.nombre"/>
                  </div>
                  <div class="col-md-12">
                    <q-input class="espacio"
                      filled
                      type="textarea"  label="Condiciones Comerciales (3ra pag.)"  v-model="Presentacion.condiciones_comerciales"
                    />
              </div>          
            </div>
            <div class="row">
              <div class="col-md-12">
                <q-btn @click="crateOrUpdate" color="primary" label="Guardar y Agregar Hojas" v-close-popup/>
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
    return {

      Presentacion: {
        id: '',
        tipo: '',
        nombre: '',
        condiciones_comerciales: ''
      },
      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      pagination: {
        rowsPerPage: 20
      },

      tipos: [
        { value: 'CLIENTE', label: 'PRESENTACIÓN PARA CLIENTES'},
        { value: 'VENDEDOR', label: 'PRESENETACIÓN PARA VENDEDORES'}
      ],
      selected_tipo: '',
    }
  },

  async created () {
    //await this.getCategorias()
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
      this.Presentacion.tipo = this.selected_tipo.value
      if (this.createOrUpdate === 'create') {
        this.guardar()
      } else {
        this.update()
      }
    },
    guardar () {
      console.log('guardar')
      this.$axios.post('api/presentaciones', this.Presentacion)
        .then((res) => {
          console.log(res)
          this.$router.push("presentaciones")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update () {
      console.log('update')
      this.$axios.put('api/presentaciones/' + this.Presentacion.id, this.Presentacion)
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
