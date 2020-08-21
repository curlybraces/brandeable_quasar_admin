<template>
    <q-page padding>
        <!-- Filters-->
        <div class="q-pa-md">
          <div class="row">
            <q-btn to="/marcas-add" label="Nueva Marca" outline color="primary" icon="edit" />
            <q-btn :to="'/marcas-add/'+'14'" label="Editar Marca" outline color="primary" />
          </div>
            <br>
            <q-table title="Mercaderia Marcas" :data="mercaderiasMarcas" :columns="columns" row-key="name" >
              <template v-slot:top-left>
                <q-btn color="positive" icon="edit" label="create" to="/people/create" />
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td class="q-gutter-x-sm">
                  <q-btn round outline color="primary" icon="edit" :to="'/people/' + props.value" />
                  <q-btn round outline color="negative" icon="delete" @click="remove(props.row)" />
                </q-td>
              </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
export default {
  name: 'mercaderiasMarcas',

  data () {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Dessert',
          align: 'left',
          field: row => row.id,
          sortable: true,
          style: 'max-width: 50px'
        },
        { name: 'oid', align: 'center', label: 'Calories', field: 'oid', sortable: true },
        { name: 'nombre', label: 'Fat (g)', field: 'nombre', sortable: true },
        { name: 'actions', field: 'id', label: 'Actions', sortable: false, required: true, align: 'center' }
      ],
      mercaderiasMarcas: []
    }
  },
  mounted () {
    this.getMercaderiasMarcas()
  },
  methods: {
    getMercaderiasMarcas () {
      this.$axios.get('http://localhost:8000/api/mercaderias_marcas')
        .then((res) => {
          this.mercaderiasMarcas = res.data
          console.log('Mercaderias Marcas', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
