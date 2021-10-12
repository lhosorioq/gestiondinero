<template>
    <v-container>
        <barra-navegacion/>
        <movimientos-comp/>
        <Footer/>
    </v-container>
</template>

<script>
import BarraNavegacion from '../components/BarraNavegacion.vue'
import Footer from '../components/Footer.vue'
import MovimientosComp from '../components/MovimientosComp.vue'

export default {
    components: { BarraNavegacion, MovimientosComp, Footer },

}
</script>

    
<style>

</style>