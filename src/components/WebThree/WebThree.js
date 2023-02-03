import React from 'react';

class WebThree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account : '',
            balance : 0
        }
        this.ethEnabled = this.ethEnabled.bind(this)
    }

    async ethEnabled() {

        const Web3 = require('web3')
        const web3 = new Web3(Web3.givenProvider)
        const bigint = require('big-integer')

        if (window.ethereum) {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const account = accounts[0]
            
            this.setState({ account : account })
            const weiBalance = await web3.eth.getBalance(account)
            const ethBalance = Math.fround(weiBalance)/bigint(1000000000000000000)
            this.setState({ balance : ethBalance })
        }   
    } 

    render() {

        let accountData = null;
        (this.state['account'] !== '') ? accountData = (
            <div>
                <h1>{this.state['account']}</h1>
                <h1>{this.state['balance']} ether</h1>
            </div>
                
        ) : accountData =( 
            <h1>Account not connected</h1>
        )

        return (
            <div>
                <div>
                    <button onClick={this.ethEnabled}>Connect</button>
                </div>
                
                <div>
                    {accountData}
                </div>
            </div>
        )
    }
}

export default WebThree;