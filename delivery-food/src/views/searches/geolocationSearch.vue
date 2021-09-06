<template>
    
  <div>
    <nav class="navbar navbar-light bg-light">
    <form class="form-inline">
        <h1 class="text-center">Busqueda por geolocalización</h1>
    </form>
    </nav>    
     
    
    <div v-if="$apollo.loading">
      <LoadingGraphql />
    </div>
    <div v-else-if="error" class="d-flex justify-content-center">
      <ConnectionErrorGraphql />
    </div>
    <div class="row">
        <template >
          <Geolocation/>
          <br />
        </template>
      </div>
    </div>
</template>

<script>
import Geolocation from "@/components/geolocation/Geolocation.vue";
import LoadingGraphql from "@/components/common/LoadingGraphql.vue";
import ConnectionErrorGraphql from "@/components/common/ConnectionErrorGraphql.vue";

export default {
  name: "geolocationSearch",
  components: {
    Geolocation,
    LoadingGraphql,
    ConnectionErrorGraphql,
  },
  data() {
    return {
      // Variable que recibe los resultados
      // de la consulta definida en la sección apollo
      allEnterprises: Object,
      // Variable que recibe el error de la consulta
      error: null,
    };
  },
  methods: {
  },
  /**
   * Consulta simple que debe definir el mismo nombre en la sección data
   */
  apollo: {
    allEnterprises: {
      // Consulta
      query: require("@/graphql/enterprise/allEnterprises.gql"),
      // Asigna el error a la variable definida en data
      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },
};
</script>
