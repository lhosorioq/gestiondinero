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
import imagen_5 from '../assets/JorgeL.jpg';

export default {
    name:'Team',
    data: () => ({
        cards: [
            { title: 'Scrum Master', name: 'Luis Humberto Osorio', description: 'Lorem ipsum dolor sit amet, consectetur', email: 'mail@mail.com', src: '', flex: 6 },
            { title: 'Product Owner', name: 'Heynar Soto Holguin', description: 'Lorem ipsum dolor sit amet, consectetur', email: 'mail@mail.com', src: '', flex: 6 },
            { title: 'Developer', name: 'Estefania Muñoz', description: 'Lorem ipsum dolor sit amet, consectetur', email: 'mail@mail.com', src: '', flex: 6 },
            { title: 'Developer', name: 'Cindy Diaz', description: 'Lorem ipsum dolor sit amet, consectetur', email: 'mail@mail.com', src: '', flex: 6 },
            { title: 'Developer', name: 'Jorge Luis Velasquez', description: 'Tecnologo en Electronica apasionado por la tecnologia y el desarrolo de software', email: 'jorgeluisvelasquezv@gmail.com', src: imagen_5, flex: 6  },
        ],
    }),

}
</script>