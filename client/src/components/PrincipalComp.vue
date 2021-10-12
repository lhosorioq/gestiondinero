<template>
    <v-container>
        <v-row>
            <v-col  md="12" lg="6" class="pa-5">
                <h1 class="font-weight-black font-entangled-bold display-3 pa-5 ">Welcome <br>{{user.name}}</h1>
                <v-spacer></v-spacer>
                <h1 class="font-weight-black font-entangled-bold display-3 pa-5">Budget management</h1>
                <h1 class="font-weight-black font-entangled-bold font-italic display-1 pa-5">¡If you want to be money in your hands, you have to start now with the control!</h1>
            </v-col>
            <v-col  md="12" lg="6"> 
                <v-img class="align-end" :src=logo></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import logo from '../assets/logo_nombre.png'
import {mapState} from 'vuex'

export default {
    name: 'PrincipalComp',
    data: () => ({
        logo,
    }),
    computed:{
        ...mapState(['user']),
    }
}
</script>