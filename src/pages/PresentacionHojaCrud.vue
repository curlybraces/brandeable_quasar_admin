<template>
  <q-page>
    <div class="row q-mt-md justify-center">
      <div class="col-md-12 col-xs-12">
        <q-card bordered class="bg-white items-center flex-sm-center flex-xs-center flex-center" flat>

          <div class="q-pa-md q-gutter-md">
            <div class="row">
                <div class="col-md-6">
                    <q-input class="espacio" outlined label="Orden" v-model="Hoja.orden"/>
                </div>
                <div class="col-md-6">
                    <q-input class="espacio" outlined label="Nombre" v-model="Hoja.nombre"/>
                </div>
                <div class="col-md-12">
                  <img style="width: 100%" 
                  :src="img" alt=""
                  onerror="this.src='https://gerware.com.pe/media/a4_placeholder.png'"
                  >
                  <q-file @change="imgUpload()" accept=".jpg, image/*" label="Presentacion" outlined required
                      v-model="Hoja.voucher">
                      <template v-slot:prepend>
                  <q-icon name="attach_file"/>
                    </template>
                  </q-file>
                </div>          
            </div>
            <div class="row">
              <div class="col-md-12">
                <q-btn @click="crateOrUpdate" color="primary" label="Guardar y Agregar Hojas" v-close-popup/>
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

      Hoja: {
        id: '',
        orden: '',
        nombre: '',
        ruta_img_bg: '',
        voucher: null,
        presentacion_id: ''
      },

      createOrUpdate: 'create',
      dialog: false,
      page: 1,
      totalPages: 0,
      prevPage: 0,
      nextPage: 0,

      img: null,

      pagination: {
        rowsPerPage: 20
      },
    }
  },
  
  async created () {
    //console.log(this.$route.params)
    this.Hoja.presentacion_id = this.$route.params.id
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
    crateOrUpdate () {
      console.log(this.Hoja)
      if (this.createOrUpdate === 'create') {
        this.guardar()
      } else {
        this.update()
      }
    },
    guardar () {
      console.log('guardar')
      var form = new FormData()
      form.append('orden', this.Hoja.orden)
      form.append('presentacion_id', this.Hoja.presentacion_id)
      form.append('file', this.voucher)
      console.log(form)
      this.$axios.post('api/presentacion_item', form)
        .then((res) => {
          console.log(res)
          //this.$router.push("presentaciones")
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
    },
    imgUpload(e) {
      console.log('gaa');
      var file = new FileReader();
      file.onload = function (e) {
        this.$refs.voucherImage.src = this.voucher;
      }
    }
  }
}
</script>
<style>
  .espacio{
    padding: 5px;
  }
</style>
