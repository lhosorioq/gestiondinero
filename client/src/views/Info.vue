<template>
    <v-container>
        <barra-navegacion></barra-navegacion>
        <info-comp/>
        <Footer/>
    </v-container>
</template>

<script>
import BarraNavegacion from '../components/BarraNavegacion.vue'
import Footer from '../components/Footer.vue'
import InfoComp from '../components/InfoComp.vue'
export default {
    components: { BarraNavegacion, InfoComp, Footer },

}
</script>

<style>

</style>