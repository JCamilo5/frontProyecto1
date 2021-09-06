<template>
  <div>
    <NavBar />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <Footer />

  </div>
</template>

<script>

import NavBar from "@/components/common/NavBar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  components: {
    NavBar,
    Footer,
  },
};
</script>
<style >
  .container-general{
    min-height: calc(100vh - var(--height-navbar) - var(--height-footer));
  }
</style>
