<template>
  <div>
    <center>
      <nav class="navbar navbar-light bg-light">
        <form class="form-inline" v-on:submit.prevent="findEnterprise()">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Buscar..."
            aria-label="Search"
            v-model="enterprise"
          />
          <button
            class="btn btn-outline-success my-2 my-sm-0 ion-ios-search"
            type="submit"
          >
            Buscar
          </button>
        </form>
      </nav>
    </center>
    <div class="mt-3">
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
          v-show="enterprise.node.status"
        >
          <template>
            <EnterpriseCard :enterprise="enterprise.node" />
            <br />
          </template>
        </div>
      </div>
    </div>
    <b-pagination v-model="currentPage" pills :total-rows="rows" center></b-pagination>
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
      rows: 2,
      currentPage: 1,
      enterprise: "",
      // Variable que recibe los resultados
      // de la consulta definida en la sección apollo
      allEnterprises: Object,
      // Variable que recibe el error de la consulta
      error: null,
    };
  },
  methods: {
    makeToast(variant = null, title, info, time) {
      this.$bvToast.toast(info, {
        title: title,
        autoHideDelay: time,
        variant: variant,
        solid: true,
      });
    },
    findEnterprise() {
      this.$apollo
        .query({
          // Establece la consulta para recuperar la empresa
          query: require("@/graphql/enterprise/findEnterprises.gql"),
          // Define las variables
          variables: {
            name_Icontains: this.enterprise,
          },
        })
        // El método query devuelve una promesa
        // que puede usarse para agregar más logica
        .then((response) => {
          this.allEnterprises = response.data.allEnterprises;
          if (response.data.allEnterprises.edges[0] == null) {
            this.makeToast(
              "danger",
              "Sin coincidencia",
              "No se han encontrado negocios",
              3000
            );
          }
          this.enterprise = "";
        });
    },
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
