<template>
    <v-container>
        <barra-navegacion/>
        <Team></Team>
        <footerend/>
    </v-container>
</template>

<script>
import BarraNavegacion from '../components/BarraNavegacion.vue';
import footerend from '../components/Footer.vue';
import Team from "../components/TeamComp.vue";

export default {
    components: {
        Team,
        BarraNavegacion,
        footerend    
    }
}
</script>
