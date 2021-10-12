<template>
    <v-container class=" justify-center" >
        <v-row>
            <v-col align="center" justify="center">
                    <v-alert :value="alerta" color="green" dark border="top" icon="mdi-check" transition="scale-transition" width="40%">{{mensaje}}</v-alert>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col align="center" justify="center">
            <v-card class=" justify-center" flat width="40%">
                <v-form class="justify-center mb-6" ref="form" v-model="valid">
                    <v-container class=" justify-center mb-6" width="50%">
                        <h1>User Data</h1>
                    </v-container>
                    <v-text-field class="ml-4 mr-4" v-model="user.name" :counter="20" :rules="nameRules" label="Name" required></v-text-field>
                    <v-text-field class="ml-4 mr-4" v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <v-text-field class="ml-4 mr-4" v-model="user.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show4 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" @click:append="show4 = !show4"></v-text-field>
                    
                    
                    
                    <v-btn :disabled="!valid" color="success" class="ma-4" @click="validate">Save</v-btn>
                </v-form>
            </v-card>
            </v-col>
        </v-row>    
    </v-container>
</template>


<script>
import {mapState, mapMutations} from 'vuex'
import axios from "axios";

    export default {
        name:'infocomp',
        props: ['value'],
        data: () => ({
        valid: true,
        show4: false,
        alerta:false,
        mensaje:'',
        usuario: {
            name:'',
            pasword: '',
            email: '',
            egree: '',
        },
        passwordRules: [
            v => !!v || 'Password is required',
            v => ( v && v.length >=  8 ) || 'Min 8 characters',
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 20) || 'Name must be less than 20 characters',
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
            },
            
        ...mapState(['user']),
        
        },

        

        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.guardar();
                    
                }  
            },
            guardar(){
                axios
                    .put(`http://localhost:3000/registros/update-user/${this.user.id}`, this.user)
                    .then(response => {
                    this.loadUser(response.data);
                    this.activarAlerta('Your data was updated')
                    })
                    .catch(error => {
                        console.log(error);
                        });
            },
            activarAlerta(text){

                this.alerta=true; 
                this.mensaje=text;
                setTimeout(() => {this.alerta=false},3000)
            },            
        ...mapMutations(["loadUser"]),

        },
    }
</script>