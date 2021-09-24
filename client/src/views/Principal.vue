<template>
    <v-container>
        <!-- Barra de menu -->
        <barnav/>

        <!-- Vista -->

        <!-- Footer -->
        <footerend/>
    </v-container>
</template>

<script>
import barnav from '../components/BarraNavegacion.vue'
import footerend from '../components/Footer.vue'

export default {
    name: 'principal',
    components : {
        barnav,
        footerend,
    },
    data: () => ({
        
    })
}
</script>