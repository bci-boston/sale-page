import React, { Component } from 'react'
import AssetToken from '../build/contracts/AssetToken.json'
import CrowdSale from '../build/contracts/CrowdSale.json'

import getWeb3 from './utils/getWeb3'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            web3: null,
            submitted: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleBuy = this.handleBuy.bind(this);

    }


    handleBuy(event) {
        this.setState({
            submitted: false
        });
        event.preventDefault();
    }

    handleSubmit(event) {
        this.setState({
            submitted: true
        });
        event.preventDefault();
    }



    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */

        const contract = require('truffle-contract')
        const assetToken = contract(AssetToken)
        const crowdSaleContract = contract(CrowdSale)
        assetToken.setProvider(this.state.web3.currentProvider)
        crowdSaleContract.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on assetToken.
        var assetTokenInstance
        var crowdSaleInstance

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            assetToken.deployed().then((instance) => {
                assetTokenInstance = instance

                // Stores a given value, 5 by default.
                return assetTokenInstance.name.call();
            }).then((result) => {
                // Update state with the result.
                this.setState({
                    tokenName: result
                });
                return assetTokenInstance.totalSupply.call();
            }).then((totalSupply) => {
                this.setState({
                    totalSupply: totalSupply.c[0],
                    tokenAddress: assetTokenInstance.address
                });
                return crowdSaleContract.deployed();
            }).then((inst) => {
                crowdSaleInstance = inst;
                this.setState({
                    crowdSaleAddress: crowdSaleInstance.address
                });
                return crowdSaleInstance.tokenReward.call();
            }).then((tokenReward) => {
                this.setState({
                    tokenReward: tokenReward
                });
            });
        })
    }

    render() {

        let torender = null

        if (this.state.submitted) {
            torender = <SaleForm
            handleBuy={this.handleBuy}
            tokenName={this.state.tokenName}
            totalSupply={this.state.totalSupply}
            tokenReward={this.state.tokenReward}
            crowdSaleAddress={this.state.crowdSaleAddress} />
        } else {
            torender = <SaleInfo
            handleSubmit={this.handleSubmit}
            crowdSaleAddress={this.state.crowdSaleAddress}
            tokenName={this.state.tokenName}
            totalSupply={this.state.totalSupply} />
        }

        return (
            <div className="App">
                  <nav className="navbar pure-menu pure-menu-horizontal">
                        <a href="#" className="pure-menu-heading pure-menu-link">Token Sale for Smart Energy</a>
                  </nav>

              { torender }
            
            </div>

        );


    }
}

class SaleInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <main className="container">
                 <p/>
                 <h3>GRID token sale information</h3> 
                 <table className="table table-dark">
                    <tbody>
                        <tr><th>Total released Number of tokens</th><td>{this.props.totalSupply}</td></tr>
                        <tr><th>Token supply remaining</th><td>{this.props.totalSupply}</td></tr>


                        <tr><th>Price per token</th><td>USD 1.50</td></tr>
                        <tr><th>Sale duration</th><td>30 days</td></tr>
                        <tr><th>Sale start date</th><td>Nov 15, 2017</td></tr>
                                              
                    </tbody>
                 </table>
                 <p/>
                 <form onSubmit={this.props.handleSubmit}>
                                  <input type="submit" className='btn btn-primary' value="Get some tokens!  " />
                            </form>
                </main>
        )
    }
}

class SaleForm extends Component {
    constructor(props) {
        super(props);
    }



    render() {

        return <main className="container">

                    <p/>
                   <h3>You can purchase GRID tokens here</h3> 

                    <table className="table table-dark">
                        <tbody>
                            <tr><th>Token Name</th><td>{this.props.tokenName}</td></tr>
                            <tr><th>Token Sale Contract Address</th>
                            <td>
                                <h4><a href={"https://etherscan.io/address/" + this.props.crowdSaleAddress}>
                                <span id="crowdSaleAddress" className="badge badge-light">{this.props.crowdSaleAddress}</span>
                                </a></h4> <label for="crowdSaleAddress  ">Click address to view on Etherscan</label>
                            </td></tr>

                            <tr><th>Tokens available</th><td>{this.props.totalSupply}</td></tr>
                            
                            
                            <tr><th colSpan="2">
                            <form onSubmit={this.props.handleBuy}>
                                  <input type="submit" className='btn btn-primary' value="Go Back" />
                            </form>
                            </th></tr>                        
                        </tbody>
                     </table>
                </main>
    }

}

export default App
