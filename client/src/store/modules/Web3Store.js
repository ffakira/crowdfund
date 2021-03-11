import connectWeb3 from "@/utils/connectWeb3";
const Web3Store = {
    state: () => ({
        web3: {
            isConnected: false,
            web3Instance: null,
            balance: null,
            error: null,
            defaultAccount: null
        }
    }),

    mutations: {
        initWeb3State(state, payload) {
            state.web3.isConnected = payload.isConnected;
            state.web3.web3Instance = payload.web3Instance;
            state.web3.defaultAccount = payload.defaultAccount;
            state.web3.balance = payload.balance;
            state.web3.error = payload.error;
        }
    },

    actions: {
        async loadWeb3({commit}) {
            let _web3 = null;
            try {
                _web3 = await Promise.resolve(connectWeb3());
                if (_web3 !== null) {
                    let bal = await _web3.web3.eth.getBalance(_web3.accounts[0])

                    commit("initWeb3State", {
                        isConnected: true,
                        web3Instance: _web3.web3,
                        defaultAccount: _web3.accounts[0],
                        balance: _web3.web3.utils.fromWei(bal, "ether"),
                    });
                }
            } catch (error) {
                commit("initWeb3State", {
                    isConnected: false,
                    web3Instance: null,
                    balance: null,
                    error: error,
                    defaultAccount: null
                });
            }
        }
    },
    getters: {
        isConnected(state) {
            return state.web3.isConnected;
        },

        getAccount(state) {
            return state.web3.defaultAccount;
        },

        getBalance(state) {
            return state.web3.balance;
        },

        getWeb3(state) {
            return state.web3.web3Instance;
        },

        getError(state) {
            return state.web3.error;
        }
    }
};

export default Web3Store;