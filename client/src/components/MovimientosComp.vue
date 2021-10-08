<template>
    <v-container>
        <!-- Titulo -->
        <v-row>
            <v-col lg=12 >
                <v-card flat>
                    <v-card-tittle>
                        <h1 class="text-md-center">MOVIMIENTOS</h1>
                    </v-card-tittle>
                </v-card>
            </v-col>
        </v-row>

        <!-- Alerta -->
        <v-alert :value="alerta" color="green" dark border="top" icon="mdi-check" transition="scale-transition">{{mensaje}}</v-alert>

        <!-- Registro de Movimientos -->
        <v-row>
            <v-col lg=4>
                <v-card elevation="4">
                    <v-form ref="form" v-model="valid">
                        <v-container pa=4>
                            <!-- Titulo de tabla -->
                            <v-toolbar class="mb-2" color="green darken-5" dark flat>
                                <v-toolbar-title>Registro de Movimientos</v-toolbar-title>
                            </v-toolbar>

                            <v-combobox v-model="movement.category" :rules="rules" :items="category" label="Select a category"></v-combobox>
                            <v-combobox v-model="movement.concept" :rules="rules" :items="concept" label="Select a concept"></v-combobox>
                                
                            <v-text-field v-model="movement.value" label="Value (Amount)" :rules="rules" hide-details="auto" type='number'></v-text-field>
                            <v-text-field v-model="movement.observation" label="Observation" :rules="rules" hide-details="auto"></v-text-field>

                            <v-card-actions>
                                <v-btn :disabled="!valid" color="success" text @click="validate">
                                    Confirm Register
                                </v-btn>
                            </v-card-actions>

                        </v-container>
                    </v-form>
                </v-card>
            </v-col>

            <!-- Movimientos registrados -->
            <v-col lg=8 >
                <v-card elevation="4">
                    <v-container pa=4>
                        <v-data-table :headers="headers" :items="this.user.movimientos" sort-by="Categoria" >
                            <template v-slot:top>
                                <v-toolbar  class="mb-2" color="green darken-5" dark flat>
                                    <v-toolbar-title>Movimientos Realizados</v-toolbar-title>
                                    
                                    <v-dialog v-model="dialog" max-width="500px">
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">Edit Item</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-combobox v-model="editedItem.category" :rules="rules" :items="category" label="Select a category"></v-combobox>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-combobox v-model="editedItem.concept" :rules="rules" :items="concept" label="Select a concept"></v-combobox>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.value" label="Value (Amount)" :rules="rules" hide-details="auto" type='number'></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.observation" label="Observation"></v-text-field>
                                                    </v-col>
                                                    
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                        <v-card>
                                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                            <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                            <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import {mapState, mapMutations} from 'vuex'

    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            alerta: false,
            mensaje: '',

            movement: {
                    category:'',
                    concept:'',
                    value: '',
                    observation: '',
            },

            datos:{index:0, item:{} },

            category: [
                'Transferencia',
                'PSE',
                'NEQUI',
                'Efectivo',
                'Consignacion',
                'Daviplata'
            ],
            concept: [
                'Pago de nomina',
                'Pago servicios',
                'Diversion',
                'Alimentacion',
                'Varios',
            ],

            rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],

        headers: [
            {
                    text: 'Categoria',
                    align: 'start',
                    sortable: true,
                    value: 'category',
            },
            { text: 'Concepto', value: 'concept' },
            { text: 'Valor', value: 'value' },
            { text: 'Observacion', value: 'observation' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            category: '',
            concept: '',
            value: '',
            observation: '',
            date: 0,
        },
        defaultItem: {
            category: '',
            concept: '',
            value: '',
            observation: '',
            date: 0,
        },
        }),

        computed: {
        ...mapState(['user']),
        },

        watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
        },

        methods: {

        async validate () {

                if (this.$refs.form.validate()){
                    this.guardar();
                    this.activarAlerta('Se ingreso un movimiento correctamente');
                    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                }  

            },
            
            guardar(){
                    

                try {
                    
                    axios
                    .put(`http://localhost:3000/registros/update-move/${this.user.id}`, this.movement)
                    .then(response => {
                    this.loadUser(response.data);
                    this.reset();
                    });

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

            removeMovement (datos) {
                
                try {
                    axios
                        .put(`http://localhost:3000/registros/delete-move/${this.user.id}`, datos)
                        .then(response => {
                        this.loadUser(response.data);
                        this.reset();
                        });

                } catch (error) {

                    console.log(error);

                }
                
            },

            updateMovement (datos) {
                
                try {
                    axios
                        .put(`http://localhost:3000/registros/edit-move/${this.user.id}`, datos)
                        .then(response => {
                        this.loadUser(response.data);
                        this.reset();
                        });

                } catch (error) {

                    console.log(error);

                }
                
            },

            reset () {

                this.$refs.form.reset()
                
            },
            
            editItem (item) {

                this.editedIndex = this.user.movimientos.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.datos.index = this.editedIndex;
                this.datos.item = this.editedItem;
                this.dialog = true

            },

            async save () {

                this.updateMovement(this.datos);
                this.close();
                this.activarAlerta('Se actualizo movimiento');

            },

            deleteItem (item) {

                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
                

            },

            async deleteItemConfirm () {

                this.removeMovement(this.editedItem);
                this.closeDelete();
                this.activarAlerta('Se elimino movimiento');

            },

            close () {

                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })

            },

            closeDelete () {

                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })

            },

            activarAlerta(text){

                this.alerta=true; 
                this.mensaje=text;
                setTimeout(() => {this.alerta=false},3000)
            },

            ...mapMutations(["loadUser"])

        },
    }
</script>

<style>

</style>