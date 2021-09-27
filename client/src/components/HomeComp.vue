<template>
    <v-container>
        <v-row>
            <v-col md="12" lg="6">
                <v-img :src=imagenppal></v-img>
            </v-col>
            <v-col md="12" lg="6">
                <v-card class="d-flex justify-center" color="#EDFFCA">
            
                    <v-form class="justify-center mb-6" ref="form" v-model="valid">
                        
                        <v-container class="d-flex justify-center">
                            <v-img class="align-end" :src=logo></v-img>
                        </v-container>

                        <v-container class="d-flex justify-center">
                            <h1 class="font-weight-black font-entangled-bold display-3">Login</h1>
                        </v-container>
                        
                        <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                        <v-text-field  v-model="user.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show4 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" @click:append="show4 = !show4"></v-text-field>

                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Login</v-btn>
                        
        
                            <v-dialog v-model="dialog" max-width="30%">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" dark v-bind="attrs" v-on="on">Sign Up</v-btn>
                                </template>
                                <v-card>
                                    <signup-com/>
                                </v-card>
                            </v-dialog>
                        
                        
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import imagenppal from '../assets/presentacion_pagina.png'
import logo from '../assets/logo_nombre.png'
import SignupCom from './SignupCom.vue';

export default {
    components: { SignupCom },
    name: 'homeComp',
    data: () => ({
        dialog: false,
        imagenppal,
        logo,
        valid: true,
            show4: false,
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Min 8 characters',
            ],
            user: {
                email: '', 
                password: '',
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

    }),

    methods: {
        validate () {
        if (this.$refs.form.validate()){
            alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                this.reset();
                window.location.href = '/main';
        }
        },
        reset () {
            this.$refs.form.reset()
        },
    },

}
</script>

<style scoped>

</style>