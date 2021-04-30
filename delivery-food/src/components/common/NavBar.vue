<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark   nav-background">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          class="logo"
          alt="logo"
          src="@/assets/logo.png"
          width="80"
          height="40"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <router-link to="/">Establecimientos</router-link>
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <span class="navbar-text">
          <a class="nav-link" href="#">
            <router-link to="/example-list">CRUD</router-link>
          </a>
        </span>
          <a
          v-if="actualizar()"
            class="nav-link dropdown-toggle text-white"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >Usuario</a
          >
          <div  class="dropdown-menu dropdown-menu-right">
            <div class="row-fluid user-infos cyruxx">
              <div class="span10 offset1">
                <div class="panel panel-primary">

                  <center>
                    <div class="panel-heading">

                      <h3 class="panel-title"><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          fill="currentColor"
                          class="bi bi-person-badge-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"
                          />
                        </svg>Usuario: {{nombres}}</h3>
                    </div>
                  </center>
                  <div class="panel-body">
                    <div class="row-fluid">
                      <div class="span3">
                      </div>
                      <div class="span6">
                        <table
                          class="table table-condensed table-responsive table-user-information"
                        >
                          <tbody>
                            <tr>
                              <td>Rol:</td>
                              <td>{{rol}}</td>
                            </tr>
                            <tr>
                              <td>Correo:</td>
                              <td>{{correo}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <center class="botones">
                    <span class="float-left">
                      <button
                        class="btn btn-success"
                        type="button"
                        data-toggle="tooltip"
                        @click="rectEditar()"
                        data-original-title="Editar usuario"
                      >
                        <i class="icon-edit icon-white">Editar usuario</i>
                      </button>
                    </span>
                    <span class="float-right">
                      <button
                        class="btn btn-danger"
                        type="button"
                        data-toggle="tooltip"
                        data-original-title="Darse de baja"
                      >
                        <i
                          class="icon-remove icon-white"
                          href="javascript:;"
                          @click="removeClient()"
                          >Darme de baja</i
                        >
                      </button>
                    </span>
                  </center>
                </div>
              </div>
            </div>
            <center>
              <div class="dropdown-divider"></div>
              <GoogleLogin class="btn btn-warning" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :logoutButton="true">Cerrar sesión</GoogleLogin>
            </center>
          </div>
        <span v-show="!ok" class="navbar-text">
          <a class="nav-link" href="/login" ><router-link to="/login">Inicio de sesión</router-link></a
          >
        </span>
        </div>
    </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
/**
 * Barra de navegación común
 */
import GoogleLogin from "vue-google-login";
export default {
  name: "NavBar",
  components: {
    GoogleLogin,
  },

  data: () => ({
    ok: localStorage.getItem('hayUser'),
    nombres:"",
    rol:"",
    correo:"",
    id:"",

    // only needed if you want to render the button with the google ui
    renderParams: {
      width: 250,
      height: 50,
      longtitle: true,

    },
  }),
  methods: {
    rectEditar() {
      this.$router.push({
        name: "Editar",
        params: { id: this.id },
      });
    },
    actualizar(){
      this.ok= localStorage.getItem('hayUser');
      if(this.ok){
         this.id= localStorage.getItem('id');
         this.correo= localStorage.getItem('correo');
         this.nombres= localStorage.getItem('names');
         this.rol= localStorage.getItem('type');
        return true;
      }
      return false;
    },
    onSuccess() {
      this.ok=false;
      localStorage.clear();
      this.$router.push({ name: "ExampleList" });
      this.$forceUpdate;
    },
    removeClient() {
      if(confirm("¿Seguro que desea darse de baja?")){
        this.$apollo
        .mutate({
          // Establece la mutación de editar
          mutation: require("@/graphql/client/deleteClient.gql"),
          // Define las variables
          variables: {
            id: this.id,
          },
        })
        // El método mutate devuelve una promesa
        // que puede usarse para agregar más logica
        .then((response) => {
          console.log("actualización de empresa:", response.data);
          console.log("agrega aquí más lógica si es necesaria");
        });
      this.$router.push({ name: "ExampleList" });
      }

    },
  },
  mounted() {
    window.addEventListener("google-loaded", this.renderGoogleLoginButton);
  },
};
</script>
<style scoped>


.nav-background{
  background-color: black !important;
}
.logo{
  width: 30%;
  height: 80%;
}
.font-orange{
  color:orangered !important;
}
.font-orange:hover{
  text-decoration: none;
}
.vertical-line{

  bottom: 20px;
  margin-left: .5em;
  padding-bottom: 10px;
  position:absolute;
  z-index:10;
  width: 2px;
  height: 2em;
  border-left:thick-solid;
  background: grey;

}

</style>
