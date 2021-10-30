import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

class User { 
  constructor (name, email, password, egree) {
      this.id = '';
      this.name= name;
      this.email= email;
      this.password= password;
      this.agree= egree;
      this.categoria='';
      this.concepto='';
      this.valor='';
      this.observacion='';
      this.movimientos=[{}];
      this.category=[];
      this.concepts=[];

      //Pendiente demas campos que se requieran para la clase user
  }
}


export default new Vuex.Store({
  state: {
    user: new User(), //Se esta usando como ejemplo este nombre se debe quitar al montar BD,
    modal:true,
  },
  mutations: {
    loadUser(state, data){
      state.user.id = data._id;
      state.user.username = data.username;
      state.user.email = data.email;
      state.user.password = '';
      state.user.movimientos = data.movimientos;
      state.user.category = data.category;
      state.user.concepts = data.concepts;

    },
    loadMovements(state, data){
      state.user.movimientos.push(data)
    },
    loadCategory(state, data){

      state.user.category.push(data);
      
    },
    loadConcept(state, data){
      state.user.concepts.push(data);
    },

    deleteCategory(state, item){
      const index = state.user.category.indexOf( item );
      state.user.category.splice( index, 1 );
    },

    deleteConcept(state, item){
      const index = state.user.concepts.indexOf( item );
      state.user.concepts.splice( index, 1 );
    },

    trueModal(state){
      state.modal = true
    },
    
    falseModal(state){
      state.modal = false
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
