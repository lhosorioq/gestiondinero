<template>

    <v-container>

        <barra-navegacion/>

        <totals-comp/>

        <Footer/>

    </v-container>
</template>

<script>
import BarraNavegacion from '../components/BarraNavegacion.vue'
import Footer from '../components/Footer.vue'
import TotalsComp from '../components/TotalsComp.vue'

export default {
    components: { BarraNavegacion, Footer, TotalsComp },

}
</script>

<style>

</style>