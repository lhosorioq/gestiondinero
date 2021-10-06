<template>
    <section>
        
        <div class="imageninicio">
            
            <img src="../assets/presentacion_pagina.png">

        </div>
        <div class="contenidologin">
            <div class="logo">
                <img src="../assets/logo_nombre.png">
            </div>

            <div class="formalogin">
                <v-form class="justify-center mb-12" ref="form" v-model="valid">
                    <h2>Login</h2>
                        
                        <v-text-field v-model="usuario.email" :rules="emailRules" label="E-mail" required></v-text-field>
                        <v-text-field  v-model="usuario.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show4 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" @click:append="show4 = !show4"></v-text-field>

                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Login</v-btn>

                        <v-btn color="primary" dark @click="modal=true">Sign Up</v-btn>
                        <signup-com v-model="modal"/>
                                                
                </v-form>
            </div>    
        </div>    
    </section>    
</template>

<script>
import SignupCom from './SignupCom.vue';
import axios from "axios";
import {mapState, mapMutations} from 'vuex'

export default {
    components: { SignupCom },
    name: 'HomeComp',
    props: {
        modal: Boolean, 
    },
    data: () => ({
        valid: true,
        show4: false,
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 8 || 'Min 8 characters',
        ],
        usuario: {
            email: '', 
            password: '',
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

    }),
    computed:{
        ...mapState(['user','dialog']),
        },

    methods: {
        async validate () {
        if (this.$refs.form.validate()){
            let respuesta = await this.login(this.usuario.email, this.usuario.password);
            
            if (respuesta!='') {
                this.loadUser(await this.dataUser(respuesta));
                this.reset();
                window.location.href = '/main'
            }else{
                alert("ERROR: usuario o contraseña incorrectos");
            }
            this.reset();
            
        }
        },
        reset () {
            this.$refs.form.reset()
        },
            async login (email, password) {
                try {
                    const response = await axios({
                        method: 'get',
                        params: { email: email, password: password},
                        url: `http://localhost:3000/registros/login`,
                        responseType: 'json'
                    });
                    return response.data;
                } catch (error) {
                    console.log(error);
                }
        },
            async dataUser (id) {
                try {
                    const response = await axios({
                        method: 'get',
                        url: `http://localhost:3000/registros/registro/${id}`,
                        responseType: 'json'
                    });
                    return response.data;
                } catch (error) {
                    console.log(error);
                }

        },
        ...mapMutations(["loadUser"])
    },

}
</script>