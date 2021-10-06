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

      //Pendiente demas campos que se requieran para la clase user
  }
}


export default new Vuex.Store({
  state: {
    user: new User(), //Se esta usando como ejemplo este nombre se debe quitar al montar BD,
  },
  mutations: {
    loadUser(state, data){
      state.user.id = data._id;
      state.user.name = data.name;
      state.user.email = data.email;
      state.user.password = data.password;
      state.user.categoria = data.categoria;
      state.user.concepto = data.concepto;
      state.user.valor = data.valor;
      state.user.observacion = data.observacion;
      state.user.movimientos = data.movimientos;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
