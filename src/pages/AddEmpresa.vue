<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
            <div class="row">
              <div class="col-md-9">
                <div class="row">
                  <div class="col-4">
                      <q-input class="espacio" standout  outlined label="Búsqueda por DNI o RUC"  v-model="Empresa.dni"/>
                  </div>
                  <div class="col-md-4">
                      <q-input class="espacio" outlined label="Razón Social" v-model="Empresa.razon_social"/>
                  </div>
                  <div class="col-md-4"><q-input class="espacio" outlined label="Nombre Comercial"  v-model="Empresa.nombre_comercial"/>
                  </div>
                  <div class="col-md-6">
                      <q-input class="espacio" outlined label="Dirección Fiscal"  v-model="Empresa.direccion_fiscal" />
                  </div>
                  <div class="col-md-6">
                      <q-input class="espacio" outlined label="Ubicación"  v-model="Empresa.ubicacion"/>
                  </div>
                  <div class="col-md-6">
                      <q-input  class="espacio" outlined label="Teléfonos"  v-model="Empresa.telefonos"/>
                  </div>
                  <div class="col-md-6">
                      <q-input class="espacio" outlined label="Correo electrónico"  v-model="Empresa.correo"/>
                  </div>
                  <div class="col-md-12">
                    <q-input class="espacio" label="Notas"
                      filled
                      type="textarea"  v-model="Empresa.notas"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="row">
                  Contenido
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h5>Contactos</h5>
              </div>
              <div class="col-md-12">
                <q-btn @click="crateOrUpdate" color="primary" label="Guardar" v-close-popup/>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <q-dialog persistent v-model="dialog">
      <q-card @keyup.enter="guardar" style="min-width: 350px">
        <q-card-section class="">
          <q-input autofocus dense label="Nombre" outlined v-model="Persona.nombre"/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup/>
          <q-btn @click="crateOrUpdate" flat label="Guardar" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

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

      Empresa: {
        razon_social: '',
        nombre_comercial: '',
        direccion_fiscal: '',
        ubicacion: '',
        telefonos: '',
        correo_electronico: '',
        notas: '',
        empresa_categorias: [],
        personas: []
      },
      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      columns: [
        { name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true },
        { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'actions', label: 'Acciones', field: '', align: 'center' }
      ],
      contactos: [],
      categorias: [],
      pagination: {
        rowsPerPage: 10
      }
    }
  },

  async created () {
    await this.getCategorias()
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
    }
  }
}
</script>
<style>
  .espacio{
    padding: 5px;
  }
</style>
