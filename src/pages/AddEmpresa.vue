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
                <q-option-group
                  :options="options"
                  label="Notifications"
                  type="checkbox"
                  v-model="group"
                />
                <!--<div class="row">
                  <ul id="example">
                    <li v-for="item in categorias" :key="item.id">
                      {{item.nombre}}
                    </li>
                  </ul>
                  Contenido
                </div>-->
              </div>
            </div>
         
              <h5>Contactos</h5>              
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
                  <!--            <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>-->
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
              </q-table>
              
              <div class="col-md-12">
                <q-btn @click="crateOrUpdate" color="primary" label="Guardar" v-close-popup/>
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
