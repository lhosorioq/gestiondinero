<template>
    <v-container>
        <v-card flat>
            <v-container>
                <v-row>
                    <v-col :cols='12'>
                        <v-card align-center color="#EDFFCA">
                            <v-card-text>
                                <h1 class="text-md-center">Totals Amounts</h1>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-spacer></v-spacer>
                    pendiente.
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
// import imagen_1 from '../assets/LuisHO.jpg'

export default {
    name:'Team',
    data: () => ({
        cards: [
            { title: 'Product Owner', name: 'Heynar Soto Holguin', description: '3D Designer', email: 'heynar76@hotmail.com', src: imagen_2, flex: 12 },
            { title: 'Developer', name: 'Estefania Muñoz', description: 'Industrial Engineer', email: 'Estefamg@outlook.es', src: imagen_3, flex: 12 },
            { title: 'Developer', name: 'Jorge Luis Velasquez', description: 'Electronic Technologist. Passionate about technology and software development', email: 'jorgeluisvelasquezv@gmail.com', src: imagen_5, flex: 12  },
            { title: 'Scrum Master', name: 'Luis Humberto Osorio', description: 'Systems Engineer \nInformation systems programmer focused on the development web applications.', email: 'lhosorio@gmail.com', src: imagen_1, flex: 12 },
        ],
    }),
}
</script>

<style scoped>
    .titulo {
        font-size: 1.2rem
    }
</style>