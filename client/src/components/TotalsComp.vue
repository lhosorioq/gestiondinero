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
            <v-col >
                <keep-alive>
                    <chart/>
                </keep-alive>
            </v-col>
        </v-row>

        <v-row>
            <v-col col=12 md=6 lg=6 align=center justify="center"> 
                <p>&nbsp;</p><p>&nbsp;</p>


                <v-simple-table>
                    <thead>
                        <tr>
                            <th scope='col'>Concept</th>
                            <th scope='col'>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total revenue</td>
                            <td>{{ingresos}}</td>
                        </tr>
                        <tr>
                            <td>Total Expenses</td>
                            <td>{{egresos}}</td>
                        </tr>
                        <tr>
                            <td>Available Balance</td>
                            <td>{{total}}</td>
                        </tr>
                    </tbody>
                </v-simple-table>

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
import Chart from './Chart.vue';

export default {
  components: { Chart  },
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

                this.ingresos = this.formatNumber(this.ingresos);
                this.egresos = this.formatNumber(this.egresos);
                this.total = this.formatNumber(this.total);
            },

        formatNumber(value){ 
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            return formatter.format(value);
        }

    },

    created() { 
        this.verTotales();
        
    }


}
</script>

<style>

</style>