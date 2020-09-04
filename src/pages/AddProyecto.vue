<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
            <div class="row">
              
                <div class="col-md-12">
                    <q-input class="espacio" outlined label="Título"  v-model="Proyecto.nombre"/>
                </div>
                <div class="col-md-4">
                  <q-select @input="getProvincias" outlined v-model="selected_region" map-options class="espacio" standout :options="regiones" label="Región" />
                </div>
                <div class="col-md-4">
                  <q-select @input="getDistritos" outlined v-model="selected_provincia" map-options class="espacio" standout :options="provincias" label="Provincia" />
                </div>
                <div class="col-md-4">
                  <q-select outlined v-model="selected_distrito" map-options class="espacio" standout :options="distritos" label="Distrito" />
                </div>
              
                <div class="col-md-12">
                <q-input class="espacio" label="Descripción"
                    filled
                    type="textarea"  v-model="Proyecto.descripcion"
                />
                </div>
                <div class="col-md-12">
                    <q-input class="espacio" outlined label="Dirección"  v-model="Proyecto.direccion"/>
                </div>
                <div class="col-md-6">
                    <q-input class="espacio" outlined label="Nombres Contacto"  v-model="Proyecto.nombres"/>
                </div>
                <div class="col-md-6">
                    <q-input class="espacio" outlined label="Apellidos Contacto"  v-model="Proyecto.apellidos"/>
                </div>
               
            </div>
         
              <!--<h5>Contactos</h5>              
              <q-table
              :columns="columns"
              :data="contactos"
              :pagination.sync="pagination"
              @row-dblclick="rowClick"
              bordered
              hide-bottom
              row-key="name"
              title=""
              virtual-scroll
              >
              <template v-slot:body-cell-archivo="props">
                  <q-td :props="props">
                  <q-btn color="grey" dense flat label="Ver"></q-btn>
                  </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                      <q-btn @click="addContacto(props)" color="grey" dense flat icon="edit" round
                              title="modificar"></q-btn>
                      <q-btn @click="deleteContacto(props)" color="grey" dense flat icon="delete" round title="eliminar"></q-btn>
                  </q-td>
              </template>
              <template v-slot:body-cell-creado="props">
                  <q-td :props="props">
                  <q-item-label>{{ new Date(props.row.creado).toLocaleDateString() }}</q-item-label>
                  </q-td>
              </template>
              </q-table>-->
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
      
      Proyecto: {
        nombres: '',
        apellidos: '',
        nombre: '',
        descripcion: '',
        direccion: '',
        ubigeo: '',
        nombre_region: '',
        nombre_provincia: '',
        nombre_distrito: ''
      },

      selected_region: {
        label: '',
        value: ''
      },
      selected_provincia: {
        label: '',
        value: ''
      },
      selected_distrito: {
        label: '',
        value: ''
      },
      regiones: [],
      provincias: [],
      distritos: [],

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
    await this.getRegiones()
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
    async getRegiones () {
      this.$axios.get('api/ubicacion_regiones')
        .then((res) => {
          this.regiones = res.data.map(opt => ({ label: opt.nombre, value: opt.id.toString() }))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getProvincias () {
        console.log(this.selected_region)
        
        if((this.selected_region.value).toString().length < 6 ){
            this.selected_region.value = "0"+(this.selected_region.value).toString();
        }

      this.$axios.get('api/ubicacion_provincias/'+this.selected_region.value)
        .then((res) => {
          this.provincias = res.data.map(opt => ({ label: opt.nombre, value: opt.id }))
          console.log(this.provincias)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getDistritos () {
        if((this.selected_provincia.value).toString().length < 6 ){
            this.selected_provincia.value = "0"+(this.selected_provincia.value).toString();
        }

      this.$axios.get('api/ubicacion_distritos/'+this.selected_provincia.value)
        .then((res) => {
          this.distritos = res.data.map(opt => ({ label: opt.nombre, value: opt.id }))
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
        if((this.selected_distrito.value).toString().length < 6 ){
            this.selected_distrito.value = "0"+(this.selected_distrito.value).toString();
        }
        this.Proyecto.ubigeo = this.selected_distrito.value;
        this.Proyecto.nombre_region = this.selected_region.label;
        this.Proyecto.nombre_provincia = this.selected_provincia.label;
        this.Proyecto.nombre_distrito = this.selected_distrito.label;

      if (this.createOrUpdate === 'create') {
        this.guardar()
      } else {
        this.update()
      }
    },
    guardar () {
        console.log(this.Proyecto)
        this.$axios.post('api/proyectos', this.Proyecto)
        .then((res) => {
          console.log(res)
          this.$router.push("/")
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
