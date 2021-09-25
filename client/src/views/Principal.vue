<template>
    <v-container>
        <!-- Barra de menu -->
        <barnav/>

        <!-- Vista -->
        <principal-comp/>

        <!-- Footer -->
        <footerend/>
    </v-container>
</template>

<script>
import barnav from '../components/BarraNavegacion.vue'
import footerend from '../components/Footer.vue'
import PrincipalComp from '../components/PrincipalComp.vue'

export default {
    name: 'principal',
    components : {
        barnav,
        footerend,
        PrincipalComp,
    },
    data: () => ({
        
    })
}
</script>