<template>
    <v-container>
        <home-comp></home-comp>
    </v-container>
</template>

<script>
import HomeComp from '../components/HomeComp.vue'

    export default {
        name: 'Home',

        components: {
            HomeComp,
            
        },
    }
</script>
