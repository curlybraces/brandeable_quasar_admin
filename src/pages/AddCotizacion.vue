<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-10 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
                <div class="row">
                  <div class="col-md-12">
                      <q-input class="espacio" standout  outlined label="Nombre del Cliente" />
                  </div>
                    <div class="col-md-2">
                      <div class="bg-grey-2 q-pa-sm rounded-borders">
                          <q-toggle 
                          name="contacto_active"
                          v-model="activeContacto"
                          label="Contacto"
                          />
                      </div>
                    </div>
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-3">
                          <q-input class="espacio" outlined label="Nombres"/>      
                        </div>
                        <div class="col-md-3">
                          <q-input class="espacio" outlined label="Apellidos" />      
                        </div>
                        <div class="col-md-3">
                          <q-input class="espacio" outlined label="Correo" />      
                        </div>
                        <div class="col-md-3">
                          <q-input class="espacio" outlined label="Telefono" />      
                        </div>
                      </div>
                    </div>
                  <div class="col-md-12">
                    <q-input class="espacio" outlined label="Paquete Servicios" />
                  </div>
                  <div class="col-md-12">
                    <q-input type="textarea" class="espacio" outlined label="Comentario" />
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
      Persona: {
        dni: '',
        cargo_empresa: '',
        nombres: '',
        apellidos: '',
        correo: '',
        telefonos: '',
        anexo: '',
        celular_trabajo: '',
        celular_personal: '',
      },

      activeContacto: false,
      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      contactos: [],     
      categorias: [],
      pagination: {
        rowsPerPage: 10
      }
    }
  },

  async created () {
    //await this.getCategorias()
    await this.loadCategorias()
    //console.log(this.options)  

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
    async loadCategorias () {
      this.$axios.get('api/directorio_categorias')
        .then((res) => {
          this.categorias = res.data
          for(let i=0; i<this.categorias.length; i++)
          {             
            this.options.push({ label: this.categorias[i].nombre, value: 'input'+this.categorias[i].id });
          }

        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getCategorias () {
      this.$axios.get('api/directorio_categorias')
        .then((res) => {
          this.categorias = res.data
        })
        .catch((err) => {
          console.log(err)
        })
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
    async deleteCategoria (prop) {
      this.$axios.delete('api/directorio_categorias/' + prop.row.id)
        .then((res) => {
          console.log(res)
          this.getCategorias()
        })
        .catch((err) => {
          console.log(err)
        })
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
      this.$axios.post('api/directorio_empresas', this.Empresa)
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
      this.$axios.put('api/directorio_empresas/' + this.Empresa.id, this.Empresa)
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
