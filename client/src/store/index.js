import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class User { 
  constructor (name, email, password, egree) {
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
    user: new User('Julanito de tal'), //Se esta usando como ejemplo este nombre se debe quitar al montar BD,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
