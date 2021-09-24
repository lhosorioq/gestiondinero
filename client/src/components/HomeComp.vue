<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-img :src=imagenppal></v-img>
            </v-col>
            <v-col cols="6">
                <v-card class="d-flex justify-center" width="100%">
            
                    <v-form class="justify-center mb-6" ref="form" v-model="valid">
                        
                        <v-container class="d-flex justify-center">
                            <v-img class="align-end" :src=logo></v-img>
                        </v-container>

                        <v-container class="d-flex justify-center">
                            <h1>Login</h1>
                        </v-container>
                        
                        <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                        <v-text-field  v-model="user.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show4 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" @click:append="show4 = !show4"></v-text-field>

                        <v-checkbox v-model="user.checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Login</v-btn>

                        
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import imagenppal from '../assets/presentacion_pagina.png'
import logo from '../assets/logo_nombre.png'

export default {
    name: 'homeComp',
    data: () => ({
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
                checkbox: false,
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