<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
            <div class="row">
              <div class="col-md-6">
                  <q-input class="espacio" standout  outlined label="Nombre" v-model="Servicio.nombre"/>
              </div>
              <div class="col-md-6">
                <q-select outlined v-model="selected_presentacion" map-options class="espacio" standout :options="presentaciones" label="Presentaciones" />
              </div>
              <div class="col-md-6">
                <q-input type="textarea" class="espacio" outlined label="Descripción Corta" v-model="Servicio.descripcion_corta"/>
              </div>
              <div class="col-md-6">
                <q-input type="textarea" class="espacio" outlined label="Descripción Larga" v-model="Servicio.descripcion_larga"/>
              </div>
              <div class="col-md-4">
                  <q-select outlined v-model="selected_moneda" map-options class="espacio" standout :options="monedas" label="Moneda" />
              </div>
              <div class="col-md-4">
                  <q-input class="espacio" standout  outlined label="Precio Venta" v-model="Servicio.precio_venta"/>
              </div>
              <div class="col-md-4">
                  <q-input class="espacio" standout  outlined label="Precio Compra" v-model="Servicio.precio_compra"/>
              </div>
              <div class="col-md-6">
                  <q-select outlined v-model="selected_renovacion" map-options class="espacio" standout :options="renovacion" label="Periodo Renovación" />
              </div>
              <div class="col-md-6">
                  <q-input class="espacio" standout  outlined label="Icono" v-model="Servicio.ruta_icono"/>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <q-btn @click="crateOrUpdate" color="primary" label="Guardar" v-close-popup/>
                </div>
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
      Servicio: {
        id: '',
        presentacion_id: '',
        nombre: '',
        descripcion_corta: '',
        descripcion_larga: '',
        ruta_icono: '',
        precio_compra: '',
        precio_venta: '',
        periodo_renovacion: ''
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
      },
      monedas: [
        { value: 'PEN', label: 'SOLES'},
        { value: 'USD', label: 'DOLARES'}
      ],
      renovacion: [
        { value: 'UNI', label: 'Única Vez'},
        { value: 'RM', label: 'Renovación Mensual'},
        { value: 'RA', label: 'Renovación Anual'}
      ],

      presentaciones: [],
      selected_presentacion: '',
      selected_moneda: '',
      selected_renovacion: '',
    }
  },

  async created () {
    //await this.getCategorias()
    await this.loadCategorias()
    await this.getPresentaciones()
    //console.log(this.options)  
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
    isEditOrUpdate(id){
        if (this.$route.params === null) {
            this.createOrUpdate = 'create'
        } else {
            this.btnName = 'Modificar'
            this.createOrUpdate = 'update'
            this.getServicio(id)
        }
    },
    getServicio (id) {
      console.log("id"+id)
      this.$axios.get('api/servicios/' + id)
        .then((res) => {
          this.Servicio = res.data
          console.log(this.Servicio)
          this.selected_presentacion = this.presentaciones.find(element => element.value === this.Servicio.presentacion_id)
          this.selected_moneda =  this.monedas.find(element => element.value === this.Servicio.precio_moneda);
          this.selected_renovacion =  this.renovacion.find(element => element.value === this.Servicio.periodo_renovacion);
        })
        .catch((err) => {
          console.log(err)
        })
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
    async getPresentaciones () {
      this.$axios.get('api/presentaciones')
        .then((res) => {
          this.presentaciones = res.data.map(opt => ({ label: opt.nombre, value: opt.id.toString() }))
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
      console.log()
      if(this.selected_presentacion !== undefined)
        this.Servicio.presentacion_id = this.selected_presentacion.value;
      if(this.selected_moneda !== undefined)
        this.Servicio.precio_moneda = this.selected_moneda.value;
      if(this.selected_renovacion !== undefined)
        this.Servicio.periodo_renovacion = this.selected_renovacion.value;
      console.log(this.Servicio)

      if (this.createOrUpdate === 'create') {
        this.guardar()
      } else {
        this.update()
      }
    },
    guardar () {
      console.log('guardar')
      this.$axios.post('api/servicios', this.Servicio)
        .then((res) => {
          console.log(res)
          this.$router.push("servicios")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update () {
      console.log('update')
      this.$axios.put('api/servicios/' + this.Servicio.id, this.Servicio)
        .then((res) => {
          console.log(res)
          this.$router.push("/")
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
