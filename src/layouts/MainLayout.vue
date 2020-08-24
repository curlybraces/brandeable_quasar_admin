<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          <q-btn flat to="login">
            Login
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menú de Navegación
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Documentos',
    caption: 'quasar.dev',
    icon: 'school',
    link: '/'
  },
  {
    title: 'Agregar Cuenta',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'add-cuenta'
  },
  {
    title: 'Ver Cuentas',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'cuentas'
  },
  {
    title: 'Agregar Empresa',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'add-empresa'
  },
  {
    title: 'Ver Empresas',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'empresas'
  },
  {
    title: 'Categorias',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'categorias'
  },
  {
    title: 'Cotizaciones',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'cotizaciones'
  },
  {
    title: 'Ver Servicios',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'servicios'
  },
  {
    title: 'Ver Presentaciones',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'presentaciones'
  },
  {
    title: 'Agregar Notificacion',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'add-notificacion'
  },
  {
    title: 'Ver Notificaciones',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'notificaciones'
  },
  {
    title: 'Usuarios',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'usuarios'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
