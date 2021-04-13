<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"
        ><router-link to="/">Domicilios</router-link></a
      >
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
            <a class="nav-link" href="#"
              ><router-link to="/enterprises">Busqueda Catalogo</router-link
              ><span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><router-link to="/geolocation"
                >Busqueda Geolocalización</router-link
              ></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><router-link to="/deliveries">Pedidos Realizados</router-link></a
            >
          </li>
        </ul>
        
         <span class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Usuario</a>
          <div class="dropdown-menu">



        <div class="row-fluid user-infos cyruxx">
            <div class="span10 offset1">
                <div class="panel panel-primary">
                  <center>
                    <div class="panel-heading">
                        <h3 class="panel-title">Usuario: Admin</h3>
                    </div>
                  </center>
                    <div class="panel-body">
                        <div class="row-fluid">
                            <div class="span3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-badge-fill" viewBox="0 0 16 16">
                                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
                                </svg>
                            </div>
                            <div class="span6">
                                <table class="table table-condensed table-responsive table-user-information">
                                    <tbody>
                                    <tr>
                                        <td>Rol:</td>
                                        <td>Administrador</td>
                                    </tr>
                                    <tr>
                                        <td>Correo:</td>
                                        <td>admin@gmail.com</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <center class="botones">
                        <span class="float-left">
                            <button class="btn btn-warning" type="button" data-toggle="tooltip" @click="$router.push('/Editar')" data-original-title="Editar usuario"><i class="icon-edit icon-white">Editar</i></button>
                        </span>
                        <span class="float-right">
                            <button class="btn btn-danger" type="button" data-toggle="tooltip" data-original-title="Darse de baja"><i class="icon-remove icon-white" href="javascript:;" v-on:click="DeleteUser()">Darme de baja</i></button>
                        </span>
                    </center>
                </div>
            </div>
        </div>
        <center>
            <div class="dropdown-divider"></div>
            <a class="btn  btn-primary" href="#">Cerrar sesión</a>
        </center>
          </div>
         </span>
        <span class="navbar-text">
          <a class="nav-link" href="#" ><router-link to="/login">Inicio de sesión</router-link></a
          >
        </span>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
    name: 'App',

    data: () => ({
        isVisible: false,
    }),

    methods: {
        DeleteUser() {
          confirm("¿Seguro que desea darse de baja?", false)
        }
    },
}
</script>

<style scoped>
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}
.panel-title {
    font-size: 16px;
    margin-bottom: 0;
    margin-top: 0;
}  
.botones{
  display:inline-block;
    width:100%;
    white-space: normal;
}
</style>
