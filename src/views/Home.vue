<template>
  <div class="container">
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre(s)</th>
          <th scope="col">Primer Apellido</th>
          <th scope="col">Segundo Apellido</th>
          <th scope="col">Estatus</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in clientes" :key="index">
          <td>
            <button class="btn btn-link text-dark" @click="showInformacionCliente(item._id)"> {{item.nombre}} </button>
          </td>
          <td>{{ item.primerApellido }}</td>
          <td>{{ item.segundoApellido }}</td>
          <td>{{ item.estatus }}</td>
          <td>
            <b-button @click="confirmDelete(item._id)" class="btn-danger btn-sm mx-2">Eliminar</b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <b-modal id="bv-modal-clienteinformacion" hide-footer>
        <template #modal-title>
          Información del cliente
        </template>
        <div class="d-block text-center">
          <div class="row">
            <div class="col-md-5 text-right font-weight-normal">
              <p>Nombre</p>
              <p>Primer Apellido</p>
              <p>Segundo Apellido</p>
              <p>Calle</p>
              <p>Número</p>
              <p>Colonia</p>
              <p>Código Postal</p>
              <p>Teléfono</p>
              <p>RFC</p>
              <p>{{cliente.estatus !== 'Rechazado' ? '-' : 'Motivo de rechazo'}}</p>
              <p>Documentos</p>
            </div>
            <div class="col-md-7 text-left font-weight-light">
              <p>{{ !cliente.nombre ? '-' : cliente.nombre }}</p>
              <p>{{ !cliente.primerApellido ? '-' : cliente.primerApellido }}</p>
              <p>{{ !cliente.segundoApellido ? '-' : cliente.segundoApellido }}</p>
              <p>{{ !cliente.calle ? '-' : cliente.calle }}</p>
              <p>{{ !cliente.numero ? '-' : cliente.numero }}</p>
              <p>{{ !cliente.colonia ? '-' : cliente.colonia }}</p>
              <p>{{ !cliente.codigoPostal ? '-' : cliente.codigoPostal }}</p>
              <p>{{ !cliente.telefono ? '-' : cliente.telefono }}</p>
              <p>{{ !cliente.rfc ? '-' : cliente.rfc }}</p>
              <p>{{ !cliente.motivoRechazo ? '-' : cliente.motivoRechazo }}</p>
              <ul v-for="(doc, i) in documents" :key="i">
                <router-link target="_blank" :to="doc.destination">{{doc.filename}}</router-link>
              </ul>
            </div>
          </div>
        </div>
        <hr>
        <button class="float-right btn btn-primary"  @click="$bvModal.hide('bv-modal-clienteinformacion')">Cerrar</button>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      clientes: [],
      cliente: {},
      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: { color: "", texto: "" },
      modalShow: false,
      documents: [],
    }
  },
  created() {
    this.listarClientes();
  },
  methods: { 
    listarClientes() {
      this.axios.get("/clientes")
        .then((res) => {
          this.clientes = res.data;
        })
        .catch((e) => {
          let msgError = "Error interno de sistema";
          if (err.response.data.mensaje) msgError = err.response.data.mensaje;
          this.fnShowAlert({ color: "danger", texto: msgError });
        });
    },
    eliminarCliente(id) {
      this.axios.delete(`/cliente/${id}`)
        .then((res) => {
          const index = this.clientes.findIndex((item) => item._id === res.data._id);
          this.clientes.splice(index, 1);
          this.fnShowAlert({color: "success", texto: "Cliente eliminado correctamente"});
        })
        .catch((e) => {
          let msjError = "Ocurrió un error interno de servidor";
          if (e.response.data.error.errors.nombre.message)
                this.mensaje.texto = e.response.data.error.errors.nombre.message;
          this.fnShowAlert({color: "danger", texto: msjError});
        });
    },
    confirmDelete(id) {
      this.$confirm(
        {
          message: `Esta seguro que desea eliminar cliente prospecto?`,
          button: {
            no: 'Cancelar',
            yes: 'Aceptar'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm 
          */
          callback: confirm => {
            if (confirm) this.eliminarCliente(id);
          }
        }
      )
    },
    showInformacionCliente(id) {
      this.axios.get(`/cliente/${id}`)
        .then((res) => {
          this.cliente = res.data.Cliente;
          this.documents = res.data.Documents;
          this.$bvModal.show('bv-modal-clienteinformacion');
        })
        .catch((e) => {
          this.fnShowAlert({color: "danger", texto: e.response.data.mensaje});
        });
    },
    countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown;
    },
    fnShowAlert(objParams) {
        this.dismissCountDown = this.dismissSecs;
        this.mensaje.color = objParams.color;
        this.mensaje.texto = objParams.texto;
    },
  },
}
</script>
