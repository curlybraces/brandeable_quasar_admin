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
          </div>
        </q-card>

        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>
            <div class="q-pa-md">
                <q-table
                :columns="columns"
                :data="Presentacion.items"
                :pagination.sync="pagination"
                @row-dblclick="rowClick"
                bordered
                hide-bottom
                row-key="name"
                title=""
                virtual-scroll
                >
                <template v-slot:top-left>
                    <h5>Contenido de la Presentación</h5>
                    <q-btn :to="'/presentacion-hoja/' + Presentacion.id" color="primary" label="Nuevo" v-close-popup/>
                </template>
                <template v-slot:body-cell-archivo="props">
                    <q-td :props="props">
                    <q-btn color="grey" dense flat label="Ver"></q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                    <!--            <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>-->
                        <q-btn :to="'/update-presentacion/' + props.row.id" color="grey" dense flat icon="edit" round
                                title="Modificar"></q-btn>
                        <q-btn @click="deletePresentacion(props)" color="grey" dense flat icon="delete" round title="borrar"></q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-creado="props">
                    <q-td :props="props">
                    <q-item-label>{{ new Date(props.row.creado).toLocaleDateString() }}</q-item-label>
                    </q-td>
                </template>
                </q-table>
                <div class=" ">
                    <div class="q-pa-lg flex flex-center no-wrap">
                        <q-btn @click="goToPage(1)" flat>
                        primero
                        </q-btn>
                        <q-btn @click="goToPage(prevPage)" flat>
                        <q-icon name=" keyboard_arrow_left">
                        </q-icon>
                        </q-btn>
                        {{ page }}
                        <q-btn @click="goToPage(nextPage)" flat>
                        <q-icon name=" keyboard_arrow_right">
                        </q-icon>
                        </q-btn>
                        <q-btn @click="goToPage(totalPages)" flat>
                        ultimo
                        </q-btn>
                    </div>
                </div>
            
                <div class="row">
                <div class="col-md-12">
                    <q-btn @click="update" color="primary" label="Modificar" v-close-popup/>
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
        condiciones_comerciales: '',
        items: []
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

      columns: [
        { name: 'orden', align: 'left', label: 'Orden', field: 'orden', sortable: true },
        { name: 'ruta_img_bg', align: 'left', label: 'Imagen', field: 'ruta_img_bg', sortable: true },
        { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'actions', label: 'Acciones', field: '', align: 'center' }
      ],

      tipos: [
        { value: 'CLIENTE', label: 'PRESENTACIÓN PARA CLIENTES'},
        { value: 'VENDEDOR', label: 'PRESENETACIÓN PARA VENDEDORES'}
      ],
      selected_tipo: '',
    }
  },

  async created () {
    this.getPresentacion()
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
    getPresentacion() {
      this.$axios.get('api/presentaciones/' + this.$route.params.id)
        .then((res) => {
            console.log(res.data)
          this.Presentacion = res.data
          console.log(this.Presentacion)
          this.selected_tipo = this.tipos.find(element => element.value === this.Presentacion.tipo)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async deletePresentacion (prop) {
      this.$axios.delete('api/presentaciones/' + prop.row.id)
        .then((res) => {
          console.log(res)
          this.getPresentaciones()
        })
        .catch((err) => {
          console.log(err)
        })
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
