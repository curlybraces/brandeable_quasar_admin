
<template>
  <q-page>
    <div class="row q-mt-md justify-center">

      <div class="col-md-10 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>
            <div class="q-pa-md">
                <q-table
                :columns="columns"
                :data="Tareas"
                :pagination.sync="pagination"
                @row-dblclick="rowClick"
                bordered
                hide-bottom
                row-key="name"
                title=""
                virtual-scroll
                >
                <template v-slot:top-left>
                    <q-btn :to="'add-tarea/'+idProyecto" color="primary" label="Agregar Tarea"></q-btn>
                </template>
                <template v-slot:body-cell-archivo="props">
                    <q-td :props="props">
                    <q-btn color="grey" dense flat label="Ver"></q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                    <q-btn :to="'/tareas/' + props.row.id" color="grey" dense flat icon="edit" round
                                title="Tareas"></q-btn>
                        <!--<q-btn @click="editProyecto(props)" color="grey" dense flat icon="edit" round
                                title="diagnóstico"></q-btn>-->
                        <q-btn @click="deleteProyecto(props)" color="grey" dense flat icon="delete" round title="borrar"></q-btn>

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

      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,
      idProyecto: '',

      columns: [
        { name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true },
        { name: 'tarea', align: 'left', label: 'Tarea', field: 'tarea', sortable: true },
        { name: 'encargado', align: 'left', label: 'Encargado', field: 'encargado', sortable: true },
        { name: 'estado', align: 'left', label: 'Estado', field: 'estado', sortable: true },
        { name: 'actions', label: 'Acciones', field: '', align: 'center' }
      ],
      Tareas: [],
      pagination: {
        rowsPerPage: 10
      }
    }
  },

  async created () {
    this.idProyecto = this.$route.params.id
    await this.getTareas()
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
    async getTareas () {
      this.$axios.get('api/tareas/'+this.$route.params.id)
        .then((res) => {
            console.log(res.data)
          this.Tareas = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async deleteProyecto (prop) {
      this.$axios.delete('api/tareas/' + prop.row.id)
        .then((res) => {
          this.getTareas()
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
  }
}
</script>
