<template>
    <v-container>
    <v-footer dark padless>
        <v-row>
            <v-col cols="1" sm="12">
                <v-card  class="green white--text  ">
                    <v-card-text>
                        <div class="text-center">
                        <h2>Follow Us</h2>
                        <v-btn v-for="icon in icons" :key="icon" :href="icon.url"  target="_blank" class="mx-4 white--text" icon>
                        <v-icon size="24px">
                            {{ icon.icon }}
                        </v-icon>
                        </v-btn>
                        </div>
                    </v-card-text>
                        <v-row>
                        <div class="row justify-content-space-evenly">
                            <v-col lg=4>
                            <article >
                                <p class="text-subtitle-2 text-center text-uppercase" >
                                    What do we do?
                                </p>
                                <p class="text-subtitle-2 text-center" >
                                    Web Develop<br>
                                    Online Store<br>
                                    Online Marketing<br>
                                    Coporations Web
                                </p>

                            </article>
                            </v-col>
                            <v-col lg=4>
                            <article >
                                
                                <div class="d-flex flex-column justify-space-between align-center">
                                <img src="../assets/logo4.png">
                                </div>
                            </article>
                            </v-col>
                            <v-col lg=4>
                            <article >
                                <p class="text-subtitle-2 text-center text-uppercase" >
                                    Information
                                </p>
                                <p class="text-subtitle-2 text-center" >
                                    We are a developers team 
                                    Somos un grupo de desarrolladores que trabajamos <br> codo a codo para que tus proyectos e ideas salgan adelante
                                </p>
                                <p class="text-subtitle-2 text-center" >
                                    El uso de "Gestion de Presupuesto" es con el fin de llevar <br> el control de su dinero, en gastos e ingresos
                                </p>

                                
                            </article>
                            </v-col>
                        </div>
                        </v-row>
                    <v-card-text class="text-center white--text pt-0">
                        Proyecto de pagina web para ciclo 3 de MisionTic UTP
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text class="white--text text-center ">
                        {{ new Date().getFullYear() }} — <strong>Vuetify - Stack MEVN</strong>
                    </v-card-text>
                        
                </v-card>
            </v-col>
        </v-row>
    </v-footer>
    </v-container>
</template>

<script>
    export default {
        name: 'Footer',
        data: () => ({
        icons: [{icon: 'mdi-facebook', url: 'https://www.facebook.com'},
                {icon: 'mdi-twitter', url: 'https://twitter.com'},
                {icon: 'mdi-linkedin', url: 'https://co.linkedin.com'},
                {icon: 'mdi-instagram', url: 'https://www.instagram.com'},
        ],

        }),
    }
</script>