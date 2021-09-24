<template>
    <v-container>
    <v-footer dark padless>
        <v-row>
            <v-col cols="1" sm="12">
                <v-card  class="green white--text text-center">
                    <v-card-text>
                        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                        </v-btn>
                    </v-card-text>
                    
                    <v-card-text class="text-center white--text pt-0">
                        GESTION DE DINERO. Lorem ipsum dolor sit amet, consectetur adip e just et, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </v-card-text>
                    <v-card-text class="text-center white--text pt-0">
                        Proyecto de pagina web para ciclo 3 de MisionTic UTP
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text class="white--text">
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
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
        }),
    }
</script>