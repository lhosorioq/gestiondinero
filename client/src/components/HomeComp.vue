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
                        
                        <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                        <v-text-field  v-model="user.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show4 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" @click:append="show4 = !show4"></v-text-field>

                        <v-checkbox v-model="user.checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Login</v-btn>

                        
                </v-form>
            </div>    
        </div>    
    </section>    
</template>

<script>


export default {
    name: 'HomeComp',
    data: () => ({
        
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