<template>
    <v-container>
        <v-app-bar color="green" dense dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title class="title font-weight-light">GESTION DE DINERO</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-img lazy-src='/client/src/assets/JorgeL.jpg' max-height= "45px" max-width= "45px" src='/client/src/assets/JorgeL.jpg' justify-content="center"></v-img>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary color="green" dark>
            <v-list nav dense>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
export default {
    name: 'BarraNavegacion',
    data: () => ({
        drawer: false,
        group: null,
        items: [
        {
            icon: 'mdi-home',
            text: 'HOME',
            link: '/main',
        },
        {
            icon: 'mdi-account',
            text: 'MOVEMENTS',
            link: '/movements',
        },
        {
            icon: 'mdi-account-plus',
            text: 'TOTALS',
            link: '/totals',
        },
        {
            icon: 'mdi-information',
            text: 'USER DATA',
            link: '/data',
        },
        {
            icon: 'mdi-lightbulb-group',
            text: 'TEAM',
            link: '/team',
        },
        {
            icon: 'mdi-lightbulb-group',
            text: 'LOGOUT',
            link: '/',
        },
        ],
    }),
}
</script>