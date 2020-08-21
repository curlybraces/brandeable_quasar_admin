<template>
    <q-page padding>
        <!-- Filters-->
        <div class="q-pa-md">
            <q-table
            title="Mercaderia Items"
            :data="mercaderiasItems"
            :columns="columns"
            row-key="name"
            />
        </div>
    </q-page>
</template>

<script>
export default {
  name: 'mercaderiasItems',

  data () {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Id',
          align: 'left',
          field: row => row.id,
          sortable: true,
          style: 'max-width: 50px'
        },
        { name: 'categoria_id', align: 'center', label: 'Categoría', field: 'oid', sortable: true },
        { name: 'marca_id', label: 'Marca', field: 'marca_id', sortable: true },
        { name: 'nombre', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'estado', label: 'Estado', field: 'estado', sortable: true },
        { name: 'precio_compra', label: 'P. Compra', field: 'precio_compra', sortable: true },
        { name: 'precio_venta', label: 'P. Venta', field: 'precio_venta', sortable: true }
      ],
      mercaderiasItems: []
    }
  },
  mounted () {
    this.getMarcasCategorias()
  },
  methods: {
    getMarcasCategorias () {
      this.$axios.get('http://localhost:8000/api/mercaderias')
        .then((res) => {
          this.mercaderiasItems = res.data
          console.log('Mercaderias Items', res.data)
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
