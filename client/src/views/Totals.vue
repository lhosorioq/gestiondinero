<template>
    <v-container>
        <!-- Barra de menu -->
        <barnav/>

        <!-- Vista -->
        <total-comp/>

        <!-- Footer -->
        <footerend/>
    </v-container>
</template>

<script>
import barnav from '../components/BarraNavegacion.vue'
import footerend from '../components/Footer.vue'
import TotalComp from '../components/TotalComp.vue'

export default {
    name: 'total',
    components : {
        barnav,
        footerend,
        TotalComp,
    },
    data: () => ({
        
    })
}
</script>