<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
                <div class="row">
                  
                  <div class="col-md-8 offset-md-2">
                      <q-input class="espacio" outlined label="Nombre" v-model="Usuario.nombre"/>
                  </div>
                  <div class="col-md-8 offset-md-2">
                      <q-input class="espacio" standout  outlined label="Rol / Cargo"  v-model="Usuario.rol"/>
                  </div>
                  <div class="col-md-8 offset-md-2"><q-input class="espacio" outlined label="Usuario"  v-model="Usuario.usr"/>
                  </div>
                  <div class="col-md-8 offset-md-2">
                      <q-input v-show="isCreateOrUpdate" class="espacio" outlined label="Contraseña"  v-model="Usuario.pwd"  type="password"/>
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
    
    return {
      Usuario: {
        id: '',
        rol: '',
        nombre: '',
        usr: '',
        pwd: '',
      },
      isCreateOrUpdate: true,

      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      pagination: {
        rowsPerPage: 10
      }, 
    }
  },
  async created () {
    this.isEditOrUpdate(this.$route.params.id)
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
    isEditOrUpdate(){
      console.log(this.$routes)
        if (this.$route.params.id === undefined) {
            this.createOrUpdate = 'create'
        } else {
            this.btnName = 'Modificar'
            this.createOrUpdate = 'update'
            this.isCreateOrUpdate = false
            this.getUsuario(this.$route.params.id)
        }
        console.log(this.btnName)
    },
    getUsuario (id) {
      console.log("id"+id)
      this.$axios.get('api/usuarios/' + id)
        .then((res) => {
          console.log('Mercaderias Items:', res)
          this.Usuario = res.data
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
      this.$axios.post('api/usuarios', this.Usuario)
        .then((res) => {
          this.$router.push("/usuarios")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update () {
      console.log('update')
      this.$axios.put('api/usuarios/' + this.Usuario.id, this.Usuario)
        .then((res) => {
          this.$router.push("/usuarios")
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
