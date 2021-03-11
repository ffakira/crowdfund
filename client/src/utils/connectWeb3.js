import Web3 from 'web3';

let connectWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (window.ethereum) {
            window.ethereum.enable({method: 'eth_requestAccounts'}).then(_accounts => {
                resolve({
                    web3: new Web3(Web3.givenProvider),
                    accounts: _accounts
                });
            }).catch(_error => {
                if (_error.code === 4001) {
                    reject(new Error("Transaction rejected by the user"));
                } else {
                    reject(new Error(_error));
                }
            });
        } else {
            reject(new Error("Web3 have not been detected in the browser"));
        }
    });
}

export default connectWeb3;