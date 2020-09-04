<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
            <div class="row">
              
                <div class="col-md-12">
                    <q-input class="espacio" outlined label="Tarea"  v-model="Tarea.tarea"/>
                </div>
              
                <div class="col-md-12">
                <q-input class="espacio" label="Descripción"
                    filled
                    type="textarea"  v-model="Tarea.descripcion"
                />
                </div>
                <div class="col-md-12">
                    <q-input class="espacio" outlined label="Encargado"  v-model="Tarea.encargado"/>
                </div>
                <div class="col-md-12">
                    <q-input class="espacio" outlined label="Estado"  v-model="Tarea.estado"/>
                </div>
               
            </div>
              <div class="row">
                <div class="col-md-12">
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
    return {
      
      Tarea: {
        proyecto_id: '',
        tarea: '',
        descripcion: '',
        encargado: '',
        estado: ''
      },

      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      contactos: [],
      columns: [
        { name: 'ani', align: 'left', label: 'DNI', field: 'dni', sortable: true },
        { name: 'nombres', align: 'left', label: 'Nombres', field: 'nombres', sortable: true },
        { name: 'apellidos', align: 'left', label: 'Apellidos', field: 'apellidos', sortable: true },
        { name: 'cargo', align: 'left', label: 'Cargo', field: 'cargo', sortable: true },
        { name: 'telefono', align: 'left', label: 'Teléfono', field: 'telefono', sortable: true },
        { name: 'anexo', align: 'left', label: 'Anexo', field: 'anexo', sortable: true },
        { name: 'actions', label: 'Acciones', field: '', align: 'center' }
      ],
      
      categorias: [],
      pagination: {
        rowsPerPage: 10
      },

      group: [],

      options: []
        /*{ label: 'Battery too low', value: 'bat' },
        { label: 'Friend request', value: 'friend', color: 'green' },
        { label: 'Picture uploaded', value: 'upload', color: 'red' }
      ]*/
    }
  },

  async created () {
    this.Tarea.proyecto_id = this.$route.params.idProyecto

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
    editEmpresa (prop) {
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
        console.log(this.Tarea)
        this.$axios.post('api/tareas', this.Tarea)
        .then((res) => {
          console.log(res)
          this.$router.push("/tareas/"+this.Tarea.proyecto_id)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update () {
      console.log('update')
      this.$axios.put('api/proyectos/' + this.Proyecto.id, this.Proyecto)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addContacto (prop) {

    },
    deleteContacto (pror) {

    }
  }
}
</script>
<style>
  .espacio{
    padding: 5px;
  }
</style>
