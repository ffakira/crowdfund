import { createStore } from 'vuex'
import Web3Store from "./modules/Web3Store";

export default createStore({
  modules: {
    web3Store: Web3Store
  }
});