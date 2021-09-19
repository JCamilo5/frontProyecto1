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
    <div>
      <div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <button
              class="input-group-text btn btn-dark"
              @click="getUserLocation"
            >
              <b-icon icon="geo-alt-fill"></b-icon>
            </button>
          </div>
          <input
            id="autocomplete"
            type="text"
            class="form-control"
            placeholder="Ingrese su dirección"
            v-model="address"
          />
        </div>
        <div>
          <section id="map" class="containder map"></section>
        </div>

        <br />
      </div>
    </div>
  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?&libraries=places&key=AIzaSyAYFB5yvCJzaZy09_qPCONtoT6-pPmCkns"></script>
<script>
import LoadingGraphql from "@/components/common/LoadingGraphql.vue";
import ConnectionErrorGraphql from "@/components/common/ConnectionErrorGraphql.vue";
import EnterpriseCard from "@/components/cards/EnterpriseCard.vue";

export default {
  name: "geolocationSearch",
  components: {
    LoadingGraphql,
    ConnectionErrorGraphql,
    EnterpriseCard,
  },
  data() {
    return {
      // Variable que recibe los resultados
      // de la consulta definida en la sección apollo
      allEnterprises: Object,
      // Variable que recibe el error de la consulta
      error: null,
      address: "",
      error: "",
      map: Object,
      enterprises: {
        name: "",
        location: "",
      },
    };
  },
  props: ["showinput", "showmap"],
  /**
   * Consulta simple que debe definir el mismo nombre en la sección data
   */
  mounted() {
    if (
      null === localStorage.getItem("existUser") ||
      false === localStorage.getItem("existUser")
    ) {
      this.$router.push({ name: "catalogSearch" });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      let location = user.location;
      this.getCompleteAddress(location).then((value) => {
        this.showUserLocation(value.lat, value.lng);
      });

      // const autocomplete = new google.maps.places.Autocomplete(
      //   document.getElementById("autocomplete"),
      //   {
      //     bounds: google.maps.LatLngBounds(
      //       new google.maps.LatLng(2.45, -76.6167)
      //     ),
      //   }
      // );
      // autocomplete.addListener("place_changed", () => {
      //   const place = autocomplete.getPlace();

      //   this.showUserLocation(
      //     place.geometry.location.lat(),
      //     place.geometry.location.lng()
      //   );
      // });
    }
  },

  async created() {
    await this.$apollo
      .query({
        // Consulta
        query: require("@/graphql/enterprise/allEnterprises.gql"),
      })
      .then((response) => {
        this.allEnterprises = response.data.allEnterprises.edges;
        this.MarkEnterprise();
        //this.pages = response.data.allEnterprises.edges.length;
      });
  },
  methods: {
    MarkEnterprise() {
      this.allEnterprises.forEach((enterprise) => {
        if (enterprise.node.status) {
          this.getCompleteAddress(enterprise.node.location).then((value) => {
            this.showEnterpriseLocation(value.lat, value.lng);
          });
        }
      });
    },
    async getCompleteAddress(address) {
      const geocoder = new google.maps.Geocoder();
      var completeAddress = {
        address: "",
        lat: "",
        lng: "",
      };
      await geocoder.geocode(
        {
          address: address,
        },
        (response, status) => {
          if (status === "OK") {
            (completeAddress.address = response[0].formatted_address),
              (completeAddress.lat = response[0].geometry.location.lat()),
              (completeAddress.lng = response[0].geometry.location.lng());
          }
        }
      );
      return completeAddress;
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let latitud = position.coords.latitude;
            let longitud = position.coords.longitude;
            this.getAddressFrom(latitud, longitud);
            this.showUserLocation(latitud, longitud);
          },
          (error) => {
            this.error = error.message;
          }
        );
      } else {
        console.log("Su navegador no soporta geolocation API");
      }
    },
    getAddressFrom(lat, lng) {
      const latlng = {
        lat: lat,
        lng: lng,
      };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latlng }, (response, status) => {
        if (status === "OK") {
          this.address = response[0].formatted_address;
          this.$emit("value", this.address);
        } else {
          console.log(status);
        }
      });
    },
    showEnterpriseLocation(lat, lon) {
      const contentString = "<div>Hola</div>";
      // "<template> <"+
      //                       EnterpriseCard+
      //                       " :enterprise="+
      //                       enterprise+
      //                       "/>Hola </template>";
      const map = new google.maps.Map(this.$refs["map"], {
        center: new google.maps.LatLng(2.45, -76.6167),
        zoom: 18,
        mapTyeId: google.maps.MapTypeId.ROADMAP,
      });
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: this.map,
      });
      this.attachSecretMessage(marker, contentString);
    },
    attachSecretMessage(marker, secretMessage) {
      const infowindow = new google.maps.InfoWindow({
        content: secretMessage,
      });

      marker.addListener("click", () => {
        infowindow.open(marker.get("map"), marker);
      });
    },

    showUserLocation(lat, lon) {
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(lat, lon),
      });
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: this.map,
      });
    },
  },
};
</script>

<style>
.map {
  /* position:absolute; */
  background: whitesmoke;
  width: 100;
  height: 30em;
}
</style>
