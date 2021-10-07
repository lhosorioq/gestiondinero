<template>
    <v-container class="d-flex justify-center">
        <v-dialog :value="value" @input="$emit('input')" max-width="32%">
            <v-card class="d-flex justify-center" flat width="100%">
                <v-form class="justify-center mb-6" ref="form" v-model="valid">
                    <v-container class="d-flex justify-center mb-6">
                        <h1>Sign Up</h1>
                    </v-container>
                    <v-text-field class="ml-4 mr-4" v-model="usuario.name" :counter="20" :rules="nameRules" label="Name" required></v-text-field>
                    <v-text-field class="ml-4 mr-4" v-model="usuario.email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <v-text-field class="ml-4 mr-4" v-model="usuario.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show4 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" @click:append="show4 = !show4"></v-text-field>
                    
                    <v-checkbox class="ml-4 mr-4" v-model="usuario.egree" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
                    
                    <v-btn :disabled="!valid" color="success" class="ma-4" @click="validate">Validate</v-btn>
                    <v-btn color="warning" class="ma-4" @click="reset">Reset Form</v-btn>
                    <v-btn color="red" class="ma-4" @click.native="$emit('input')">Close</v-btn>
                </v-form>
            </v-card>
        </v-dialog>    
    </v-container>
</template>


<script>
import axios from "axios";

    export default {
        name:'signup',
        props: ['value'],
        data: () => ({
        valid: true,
        show4: false,
        usuario: {
            name:'',
            pasword: '',
            email: '',
            egree: '',
        },
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 8 || 'Min 8 characters',
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 20) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        }),

        computed:{
            show: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        },

        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.guardar();
                    this.$emit('input') // Cierra el modal al terminar registro satisfactorio
                    alert("Registro Exitoso");
                }  
            },
            guardar(){
                axios
                    .post("http://localhost:3000/registros/user-new", this.usuario)
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