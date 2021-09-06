<template>
    
  <div>
    <nav class="navbar navbar-light bg-light">
    <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0 ion-ios-search" type="submit"></button>
    </form>
    </nav>    
     
    
    <div v-if="$apollo.loading">
      <LoadingGraphql />
    </div>
    <div v-else-if="error" class="d-flex justify-content-center">
      <ConnectionErrorGraphql />
    </div>
    <div class="row">
      <div
        class="col-xl-4 col-md-6 col-sm-12"
        v-for="enterprise in allEnterprises.edges"
        :key="enterprise.node.id"
      >
        <template v-if="enterprise.node.status">
          <EnterpriseCard :enterprise="enterprise.node" />
          <br />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import EnterpriseCard from "@/components/cards/EnterpriseCard.vue";
import LoadingGraphql from "@/components/common/LoadingGraphql.vue";
import ConnectionErrorGraphql from "@/components/common/ConnectionErrorGraphql.vue";

export default {
  name: "catalogSearch",
  components: {
    EnterpriseCard,
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
