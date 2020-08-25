<template>
  <q-page>
    <div class="row q-mt-md justify-center">

      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>
            <div class="q-pa-md">
                <q-table
                :columns="columns"
                :data="empresas"
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
                    <!--            <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>-->
                        <q-btn @click="addEmpresa(props)" color="grey" dense flat icon="edit" round
                                title="modificar"></q-btn>
                        <q-btn @click="deleteEmpresa(props)" color="grey" dense flat icon="delete" round title="eliminar"></q-btn>

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
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      columns: [
        { name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true },
        { name: 'ruc', align: 'left', label: 'RUC', field: 'ruc', sortable: true },
        { name: 'razon_social', align: 'left', label: 'Razón Social', field: 'razon_social', sortable: true },
        { name: 'nombre_comercial', align: 'left', label: 'Nombre Comercial', field: 'nombre_comercial', sortable: true },
        { name: 'domicilio_fiscal', align: 'left', label: 'Domicilio Fiscal', field: 'domicilio_fiscal', sortable: true },
        { name: 'telefonos', align: 'left', label: 'Teléfonos', field: 'telefonos', sortable: true },
        { name: 'correo', align: 'left', label: 'Correo', field: 'correo', sortable: true },
        { name: 'actions', label: 'Acciones', field: '', align: 'center' }
      ],
      empresas: [],
      pagination: {
        rowsPerPage: 10
      }
    }
  },

  async created () {
    await this.getEmpresas()
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
    async getEmpresas () {
      this.$axios.get('api/directorio_empresas')
        .then((res) => {
          this.empresas = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addEmpresa (prop) {
      console.log(prop)
    },
    async deleteEmpresa (prop) {
      this.$axios.delete('api/directorio_empresas/' + prop.row.id)
        .then((res) => {
          console.log(res)
          this.getEmpresas()
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
    }
  }
}
</script>
