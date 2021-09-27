<template>
    <v-container class="d-flex justify-center">
        <v-card class="d-flex justify-center" width="100%">
            
            <v-form class="justify-center mb-6" ref="form" v-model="valid">
                <v-container class="d-flex justify-center mb-6">
                    <h1>Sign Up</h1>
                </v-container>
                <v-text-field class="ml-4 mr-4" v-model="user.name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                <v-text-field class="ml-4 mr-4" v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field class="ml-4 mr-4" v-model="user.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show4 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" @click:append="show4 = !show4"></v-text-field>
                
                <v-checkbox class="ml-4 mr-4" v-model="user.checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
                
                <v-btn :disabled="!valid" color="success" class="ma-4" @click="validate">Validate</v-btn>
                <v-btn color="warning" class="ma-4" @click="reset">Reset Form</v-btn>

            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios";

    class Users { 
        constructor (name, email, password, section, egree) {
            this.name= name;
            this.email= email;
            this.password= password;
            this.section= section;
            this.agree= egree;
        }
    }

    export default {
        name:'signup',
        data: () => ({
        valid: true,
        dialog: false,
        show4: false,
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 8 || 'Min 8 characters',
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        user: new Users(),
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        }),

        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    alert("Registro Exitoso");
                    this.guardar();
                }  
            },
            guardar(){
                axios
                    .post("http://localhost:3000/registros/save", {
                    login: this.user
                    })
                    .then(response => {
                    this.message = response.data;
                    this.reset();
                    });
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },

        },
    }
</script>