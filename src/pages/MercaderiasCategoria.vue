<template>
    <q-page padding>
        <!-- Filters-->
        <div class="q-pa-md">
            <q-table
            title="Mercaderia Categorias"
            :data="mercaderiasCategorias"
            :columns="columns"
            row-key="name"
            />
        </div>
    </q-page>
</template>

<script>
export default {
  name: 'mercaderiasCategorias',

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
        { name: 'nombre', label: 'Fat (g)', field: 'nombre', sortable: true }
      ],
      mercaderiasCategorias: []
    }
  },
  mounted () {
    this.getMarcasCategorias()
  },
  methods: {
    getMarcasCategorias () {
      this.$axios.get('http://localhost:8000/api/mercaderias_categorias')
        .then((res) => {
          this.mercaderiasCategorias = res.data
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
