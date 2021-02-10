<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <div id="nav">
      <router-link to="/" @click.native="accionItemMenu({ocultarInicio: true})" :style="{ display: ocultarInicio ? 'none' : '' }">
        <button class="btn btn-link">Ir a Inicio</button>
      </router-link>
      <router-link to="/cliente" @click.native="accionItemMenu({ocultarInicio: false})" :style="{ display: !ocultarInicio ? 'none' : '' }">
        <button class="btn btn-primary">Agregar Cliente</button>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["ocultarInicio"]),
  },
  methods: {
    ...mapActions(["accionItemMenu"]),
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: left;
  margin-left: 6%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
