<template>
    <div class="container-fluid">
      <div class="row no-gutter">
        <!-- The image half -->
        <div class="col-md-1 d-none d-md-flex"></div>

        <!-- The content half -->
        <div class="col-md-10 bg-light">
          <div class="login d-flex py-1">
            <!-- Demo content-->
            <div class="container">
              <div class="row">
                <div class="col-lg-12 mx-auto">
                  <h3 class="display-4">Cliente</h3>
                  <p class="text-muted mb-4">Captura de datos</p>
                  <form @submit.prevent="agregarCliente()" enctype="multipart/form-data">
                        <div class="row">
                              <b-alert
                                    :show="dismissCountDown"
                                    dismissible
                                    :variant="mensaje.color"
                                    @dismissed="dismissCountDown = 0"
                                    @dismiss-count-down="countDownChanged"
                              >
                                    {{ mensaje.texto }}
                              </b-alert>
                              <div class="col-md-6 bg-light">
                                    <float-label class="form-group mt-4 input-group">
                                    <input type="text" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4" 
                                                placeholder="Nombre(s) *" 
                                                required=""
                                                autofocus=""
                                                maxlength="60"
                                                v-model="cliente.nombre">
                                    </float-label>
                                    <float-label class="form-group mt-4">
                                    <input type="text" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4" 
                                                placeholder="Primer Apellido *" 
                                                required=""
                                                autofocus=""
                                                maxlength="60"
                                                v-model="cliente.primerApellido">
                                    </float-label>
                                    <float-label class="form-group mt-4">
                                          <input type="text" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4" 
                                                placeholder="Segundo Apellido" 
                                                autofocus=""
                                                maxlength="60"
                                                v-model="cliente.segundoApellido">
                                    </float-label>
                                    <float-label class="form-group mt-4">
                                          <input type="text" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4" 
                                                placeholder="Calle *" 
                                                required=""
                                                autofocus=""
                                                maxlength="200"
                                                v-model="cliente.calle">
                                    </float-label>
                                    <float-label class="form-group mt-4">
                                          <input type="text" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4 mt-3" 
                                                placeholder="Número *" 
                                                required=""
                                                autofocus=""
                                                maxlength="15"
                                                v-model="cliente.numero">
                                    </float-label>
                              </div>
                              <div class="col-md-6 bg-light">
                                    <float-label class="form-group mt-4">
                                          <input type="text" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4 mt-3" 
                                                placeholder="Colonia *" 
                                                required=""
                                                autofocus=""
                                                maxlength="150"
                                                v-model="cliente.colonia">
                                    </float-label>
                                    <float-label class="form-group mt-4">
                                          <input type="text" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4 mt-3" 
                                                placeholder="Código Postal *" 
                                                required=""
                                                autofocus=""
                                                maxlength="10"
                                                v-model="cliente.codigoPostal">
                                    </float-label>
                                    <float-label class="form-group mt-4">
                                          <input type="tel" 
                                                class="form-control rounded-pill border-0 shadow-sm px-4 mt-3" 
                                                placeholder="Teléfono *" 
                                                required=""
                                                autofocus=""
                                                maxlength="20"
                                                v-model="cliente.telefono">
                                    </float-label>
                                    <float-label class="form-group mt-4 field">
                                          <input type="text"
                                                class="form-control rounded-pill border-0 shadow-sm px-4 mt-3 field" 
                                                placeholder="RFC *" 
                                                required=""
                                                autofocus=""
                                                maxlength="13"
                                                v-model="cliente.rfc">
                                    </float-label>
                                    <float-label class="form-group mt-4 field">
                                          <label>Archivo
                                                <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()"/>
                                          </label>
                                    </float-label>
                              </div>
                        </div>
                        <button type="submit" @click="accionItemMenu({ocultarInicio: true});" class="btn btn-primary btn-md text-uppercase m-4 pl-4 pr-4 rounded-pill shadow-sm float-right">Enviar</button>
                  </form>
                </div>
              </div>
            </div>
            <!-- End -->
          </div>
        </div>
        <!-- End -->
        <div class="col-md-1 d-none d-md-flex"></div>
      </div>
    </div>
  
</template>

<script>
import router from '../router/index'
import { mapActions } from "vuex";

export default {
      components: {
      },
      data() {
            return {
                  cliente: {
                        nombre: "",
                        primerApellido: "",
                        segundoApellido: "",
                        calle: "",
                        numero: "",
                        colonia: "",
                        codigoPostal: "",
                        telefono: "",
                        rfc: "",
                        documents: "",
                  },
                  dismissSecs: 5,
                  dismissCountDown: 0,
                  mensaje: { color: "", texto: "" },
                  clientes: [],
                  file: "",
            }
      },
      computed: {
      },
      methods: {
            ...mapActions(["accionItemMenu"]),
            countDownChanged(dismissCountDown) {
                  this.dismissCountDown = dismissCountDown;
            },
            fnShowAlert(objParams) {
                  this.dismissCountDown = this.dismissSecs;
                  this.mensaje.color = objParams.color;
                  this.mensaje.texto = objParams.texto;
                  this.showAlert();
                  
            },
            async agregarCliente() {
                  this.cliente.documents = this.archivosArr;
                  this.axios.post("/nuevo-cliente", this.cliente)
                        .then((res) => {
                              this.clientes.push(res.data);
                              /*Guardar adjuntos*/
                              var header = {
                                    Accept: 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-Type': 'multipart/form-data'
                              };
                              let formData = new FormData();
                              formData.append('file', this.file);
                              this.axios.post(`/subir/${res.data._id}`, formData, header)
                                    .then(function(){
                                          console.log('SUCCESS!!');
                                    })
                                    .catch(err => {
                                          console.log(err);
                                    });
                              this.ocultarInicio = true;
                              this.limpiar();
                              router.push('/');
                        })
                        .catch((e) => {
                              let msjError = "Ocurrió un error interno de servidor";
                              if (e.response.data.error.errors.nombre.message)
                                    this.mensaje.texto = e.response.data.error.errors.nombre.message;
                              this.fnShowAlert({color: "danger", texto: msjError});
                        });
            },
            onChangeFileUpload() {
                  this.file = this.$refs.file.files[0];
            },
            limpiar() {
                  this.cliente.nombre = "";
                  this.cliente.primerApellido = "";
                  this.cliente.segundoApellido = "";
                  this.cliente.segundoApellido = "";
                  this.cliente.calle = "";
                  this.cliente.numero = "";
                  this.cliente.colonia = "";
                  this.cliente.codigoPostal = "";
                  this.cliente.telefono = "";
                  this.cliente.rfc = "";
            },
      },
}
</script>
<style scoped>
      input[type="file"]{
    position: absolute;
    
  }
  div.file-listing{
    width: 200px;
  }
  span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
  }
</style>