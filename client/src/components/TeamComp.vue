<template>
    <v-container>
        <v-card flat>
            <v-container>
                <v-row>
                    <v-col :cols='12'>
                        <v-card align-center>
                            <v-card-text>
                                <h1 class="text-md-center">TEAM</h1>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                    <v-card>
                        <v-row justify="center">
                        <v-col cols="4">
                        <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                            <v-card-title v-text="card.title" class="text-xs-center"></v-card-title>
                        </v-img>
                        </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="mx-2" fab dark large color="green" icon :href="`mailto:${card.email}`">
                                <v-icon>mdi-email</v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-card-text>
                            {{card.name}}<br>{{card.description}}<br>{{card.email}}
                        </v-card-text>
                        
                    </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import imagen_1 from '../assets/LuisHO.jpg'
import imagen_2 from '../assets/HeynarS.jpg'
import imagen_3 from '../assets/EstefaniaM.jpg'
import imagen_5 from '../assets/JorgeL.jpg';

export default {
    name:'Team',
    data: () => ({
        cards: [
            { title: 'Scrum Master', name: 'Luis Humberto Osorio', description: 'Systems Engineer \nInformation systems programmer focused on the development web applications.', email: 'lhosorio@gmail.com', src: imagen_1, flex: 6 },
            { title: 'Product Owner', name: 'Heynar Soto Holguin', description: '3D Designer', email: 'heynar76@hotmail.com', src: imagen_2, flex: 6 },
            { title: 'Developer', name: 'Estefania Muñoz', description: 'Industrial Engineer', email: 'Estefamg@outlook.es', src: imagen_3, flex: 6 },
            { title: 'Developer', name: 'Cindy Diaz', description: 'Lorem ipsum dolor sit amet, consectetur', email: 'mail@mail.com', src: '', flex: 6 },
            { title: 'Developer', name: 'Jorge Luis Velasquez', description: 'Electronic Technologist. Passionate about technology and software development', email: 'jorgeluisvelasquezv@gmail.com', src: imagen_5, flex: 6  },
        ],
    }),

}
</script>