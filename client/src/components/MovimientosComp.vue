<template>
    <v-container>
        <!-- Titulo -->
        <v-row>
            <v-col lg=12 >
                <v-card flat>
                    <v-card-title class="justify-center">
                        <h1 class="text-md-center">MOVEMENTS</h1>
                    </v-card-title>
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
                                <v-toolbar-title>Record of Movements</v-toolbar-title>
                            </v-toolbar>

                            <v-combobox v-model="movement.category" :rules="rules" :items="user.category" label="Select a category">
                                <template v-slot:item="{ item }">
                                        {{ item }}                                    
                                    <v-spacer></v-spacer>
                                    <v-list-item-action @click.stop>
                                        <v-btn
                                        icon
                                        @click.stop.prevent="editCategory(item)"
                                        >
                                        <v-icon>{{ 'mdi-delete' }}</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </template>
                            </v-combobox>
                            <v-combobox v-model="movement.concept" :rules="rules" :items="user.concepts" label="Select a concept">
                                <template v-slot:item="{ item }">
                                        {{ item }}                                    
                                    <v-spacer></v-spacer>
                                    <v-list-item-action @click.stop>
                                        <v-btn
                                        icon
                                        @click.stop.prevent="editConcept(item)"
                                        >
                                        <v-icon>{{ 'mdi-delete' }}</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </template>
                            </v-combobox>
                                
                            <v-text-field v-model="movement.value" label="Value (Amount)" :rules="rules" hide-details="auto" type='number'></v-text-field>
                            <v-text-field v-model="movement.observation" label="Observation" :rules="rules" hide-details="auto"></v-text-field>

                            <v-radio-group v-model="movement.radioValue" :rules="rulesRadio" row required> 
                                <v-radio label="Income" :value=1 ></v-radio>
                                <v-radio label="Expenses" :value=2></v-radio>
                            </v-radio-group>

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
                                    <v-toolbar-title>Movements Made</v-toolbar-title>
                                    
                                    <v-dialog v-model="dialog" max-width="500px">
                                        <v-card>
                                        <v-form ref="form" v-model="validEdit">
                                            <v-card-title>
                                                <span class="text-h5">Edit Item</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-combobox v-model="editedItem.category" :rules="rules" :items="user.category" label="Select a category"></v-combobox>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-combobox v-model="editedItem.concept" :rules="rules" :items="user.concepts" label="Select a concept"></v-combobox>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.value" label="Value (Amount)" :rules="rules" hide-details="auto" type='number'></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.observation" label="Observation"></v-text-field>
                                                    </v-col>

                                                    <v-radio-group v-model="editedItem.radioValue" :rules="rulesRadio" row required> 
                                                        <v-radio label="Income" :value=1 ></v-radio>
                                                        <v-radio label="Expenses" :value=2></v-radio>
                                                    </v-radio-group>

                                                    
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                                <v-btn color="blue darken-1" text @click="save" :disabled="!validEdit">Save</v-btn>
                                            </v-card-actions>
                                        </v-form>
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
            valid: true,
            validEdit: true,
            mensaje: '',
            movement: {
                    category:'',
                    concept:'',
                    value: '',
                    observation: '',
                    radioValue: 1,
                    fecha: '',
            },

            datos:{index:0, item:{} },

            category: [
                'Transfer',
                'PSE',
                'NEQUI',
                'Cash',
                'Consignment',
                'Daviplata'
            ],
            concept: [
                'Payment of payroll',
                'Payment of services',
                'Fun',
                'Feeding',
                'Several',
            ],

            rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],

            rulesRadio: [
                value => !!value || 'Required.',
            ],

        headers: [
            {
                    text: 'Category',
                    align: 'start',
                    sortable: true,
                    value: 'category',
            },
            { text: 'Concept', value: 'concept' },
            { text: 'Value', value: 'value' },
            { text: 'Observation', value: 'observation' },
            { text: 'Date', value: 'fecha' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            category: '',
            concept: '',
            value: '',
            observation: '',
            radioValue: 1,
            date: 0,
        },
        defaultItem: {
            category: '',
            concept: '',
            value: '',
            observation: '',
            radioValue: 1,
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
                    
                    if (this.movement.radioValue === 2) {
                        
                        this.movement.value = '-' + this.movement.value;
                        
                    }else if(this.movement.value[0] === '-'){
                        this.movement.value = this.movement.value.slice(1);
                    }
                    this.movement.fecha = this.crearFecha();
                    this.loadMovements(this.movement);
                    const prue = this.user.category.find(cat => cat === this.movement.category);
                    
                    if(!prue){
                        this.loadCategory(this.movement.category);
                    }
                    const prue2 = this.user.concepts.find(cat => cat === this.movement.concept);
                    if(!prue2){
                        this.loadConcept(this.movement.concept);
                    }

                    this.guardar();
                    this.activarAlerta('Movement entered correctly');
                    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                }  

            },
            
            guardar(){
                    
                try {
                    
                    axios
                    .put(`http://localhost:3000/registros/update-usermove/${this.user.id}`, this.user)
                    .then(response => {
                    this.loadUser(response.data);
                    this.reset();
                    })
                    .catch(error => {
                        console.log(error);
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

                this.$refs.form.reset();
                
                this.movement.radioValue = 1;
                
            },
            
            editItem (item) {

                this.editedIndex = this.user.movimientos.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.defaultItem = Object.assign({}, item);
                this.datos.index = this.editedIndex;
                this.datos.item = this.editedItem;
                this.dialog = true;

            },

            async save () {
                
                if (this.defaultItem.radioValue === 1 && this.editedItem.radioValue === 2) {
                    this.datos.item.value = '-' + this.datos.item.value;
                }else  if (this.defaultItem.radioValue === 2 && this.editedItem.radioValue === 1){ 
                    this.datos.item.value = this.datos.item.value.slice(1);
                    
                }
                
                this.updateMovement(this.datos);
                this.close();
                this.activarAlerta('Updated movement');

            },

            deleteItem (item) {

                this.editedItem = Object.assign({}, item);
                this.dialogDelete = true;
                

            },

            async deleteItemConfirm () {

                this.removeMovement(this.editedItem);
                this.closeDelete();
                this.activarAlerta('Movement removed');

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

            crearFecha(){
                let date = new Date();
                return date.toLocaleString()
            },

            editCategory(item){
                this.deleteCategory(item)
                this.guardar();
            },

            editConcept(item){
                this.deleteConcept(item)
                this.guardar();
            },

            ...mapMutations(["loadUser", "loadMovements", "loadCategory", "loadConcept", "deleteCategory", "deleteConcept"])

        },
    }
</script>

<style>

</style>