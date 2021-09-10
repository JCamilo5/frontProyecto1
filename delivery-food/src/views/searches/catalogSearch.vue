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
          v-for="enterprise in displayedEnterprises"
          :key="enterprise.node.id"
          v-show="enterprise.node.status"
        >
          <template>
            <EnterpriseCard :enterprise="enterprise.node" />
            <br />
          </template>
        </div>
      </div>
      <div class="row">
    <div class="btn-group col-md-2 offset-md-5">
      <button
        type="button" 
        v-if="page != 1"
        @click="page--"
        class="btn btn-sm btn-outline-secondary">Anterior</button>
       <button
        type="button"
        v-for="pageNumber in pages.slice(page- 1, page+ 5)"
        :key="pageNumber"
        @click ="page = pageNumber"
        class="btn btn-sm btn-outline-secondary">
        {{pageNumber}}
        </button>

       <button type="button" 
        v-if="page < pages.length"
        @click="page++"
        class="btn btn-sm btn-outline-secondary"
        >Siguiente</button>
    </div>
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
      enterprise: "",
      // Variable que recibe los resultados
      // de la consulta definida en la sección apollo
      allEnterprises: Object,
      page: 1,
      perpage: 3,
      pages: [],
      // Variable que recibe el error de la consulta
      error: null,
    };
  },
  async created(){
     await this.$apollo
        .query({
           // Consulta
          query: require("@/graphql/enterprise/allEnterprises.gql"),
          
        })
    .then((response) => {
          this.allEnterprises = response.data.allEnterprises;
          this.setEnterprises();
          //this.pages = response.data.allEnterprises.edges.length;
          }
       ) },

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
          //this.pages = response.data.allEnterprises.edges.length;
          if (response.data.allEnterprises.edges[0] == null) {
            this.makeToast(
              "danger",
              "Sin coincidencia",
              "No se han encontrado negocios",
              3000
            );
          }
          this.pages = [];
          this.setEnterprises();
          this.enterprise = "";
        });
    },
    setEnterprises(){
      if(this.allEnterprises.edges != null ){
        let numberPages = Math.ceil(this.allEnterprises.edges.length / this.perpage);
        for(let i=1; i <= numberPages;){
          this.pages.push(i);
          i+=1;
        }
      }
    },
    paginate(allEnterprises){
        if(allEnterprises != null){
          let page = this.page;
          let perpage = this.perpage;
          let from = (page * perpage) - perpage;
          let to = (page * perpage);
          return allEnterprises.slice(from, to);
        }else{
          return null;
        }
    }
    },

   computed: {
     displayedEnterprises(){
  
       return this.paginate(this.allEnterprises.edges);
    }
  },
};
</script>
