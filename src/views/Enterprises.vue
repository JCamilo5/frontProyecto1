<template>
  <div class="about">
    <h1>Lista de establecimientos/empredimientos</h1>
    <br>
    <ApolloQuery :query="require('../graphql/allEnterprises.gql')">
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Cargando...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">A ocurrido un error</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">

          <div class="container">
            <div class="row">
              <div
                class="col-4"
                v-for="enterprise in data.allEnterprises.edges"
                :key="enterprise.node.id"
              >
                <EnterpriseCard :enterprise="enterprise.node"/>
              </div>
            </div>
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No hay resultados :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import EnterpriseCard from '../components/EnterpriseCard.vue';

export default {
  name: "Enterprises",
  components: {
    EnterpriseCard
  },
};
</script>
