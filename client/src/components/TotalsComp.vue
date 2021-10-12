<template>
    <v-container>

        <!-- Titulo -->
        <v-row>
            <v-col lg=12 >
                <v-card flat>
                    <v-card-title class="justify-center">
                        <h1 class="text-md-center">TOTALS</h1>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
        
            <v-col col=12 md=6 lg=6 align=center justify="center"> 
                <br><br><br><br><br>
                <h1>Total revenue: {{ingresos}}</h1>
                <h1>Total Expenses: {{egresos}}</h1>
                <h1>Available Balance: {{total}}</h1>
            </v-col>

            <v-container col=12 md=6 lg=6>
                <div class="text-center">
                    <v-progress-circular :rotate="0" :size="400" :width="130" :value="porcentaje" :color="color">
                    {{ porcentaje }}
                </v-progress-circular>
                </div>
            </v-container>

        </v-row>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'totalscomp',

    data: () => ({ 
        ingresos: 0,
        egresos: 0,
        total: 0,
        porcentaje: 0,
        color: 'teal',
    }),

    computed:{

        ...mapState(['user']),

        },

    methods: {
        
        verTotales () { 
                
                this.user.movimientos.forEach(element => (this.ingresos += parseInt(element.value,10) > 0 ? parseInt(element.value,10) : 0));

                this.user.movimientos.forEach(element => (this.egresos += parseInt(element.value,10) < 0 ? parseInt(element.value,10) : 0));

                this.total = this.ingresos + this.egresos;

                this.porcentaje = Math.round((((this.total / this.ingresos) * 100)*100)/100);

                if (this.porcentaje > 50 && this.porcentaje < 70 ) {
                    this.color = 'yellow'; 
                } else if (this.porcentaje < 50) {
                    this.color = 'red'; 
                }


            },

    },

    created() { 
        this.verTotales();
    }


}
</script>

<style>

</style>