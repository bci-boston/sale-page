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
                return assetTokenInstance.totalSupply.call();
            })
                /*.then((result) => {
                    // Update state with the result.
                    this.setState({
                        tokenName: result
                    });
                    return assetTokenInstance.totalSupply.call();
                })*/
                .then((totalSupply) => {
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
                return crowdSaleInstance.priceInWei.call();
            }).then((priceInWei) => {
                this.setState({
                    priceInWei: priceInWei.c[0]
                });
                return crowdSaleInstance.tokensSold.call();
            }).then((soldTokens) => {
                this.setState({
                    soldTokens: soldTokens.c[0]
                });
            });
        })
    }

    render() {

        let torender = null

        if (this.state.submitted) {
            torender = <SaleActionView
            priceInWei={this.state.priceInWei}
            soldTokens={this.state.soldTokens}
            totalSupply={this.state.totalSupply}
            handleBuy={this.handleBuy}
            crowdSaleAddress={this.state.crowdSaleAddress}
            />
        } else {
            torender = <SaleInfo
            priceInWei={this.state.priceInWei}
            soldTokens={this.state.soldTokens}
            handleSubmit={this.handleSubmit}
            crowdSaleAddress={this.state.crowdSaleAddress}
            tokenName={this.state.tokenName}
            totalSupply={this.state.totalSupply} />
        }

        return (
            <div className="App">
                  
              { torender }
            
            </div>

        );


    }
}


class SaleInfo extends Component {
    render() {
        return (
            <div className="panel-body">
                <h3 className="text-center">Power2Peer Token Sale</h3>
                <div className="row">
                <div className="col-sm-4 text-center">
                <p><span id="tokensforsale" className="text-info"><div data-reactroot="">{this.props.totalSupply - this.props.soldTokens}</div></span><br/>
                            Power2Peer tokens for sale</p>
                <p></p></div>
                <div className="col-sm-4 text-center">
                <p><span id="tokenssold" className="text-info"><div data-reactroot="">{this.props.soldTokens}</div></span><br/>
                            Power2Peer tokens sold</p>
                <p></p></div>
                <div className="col-sm-4 text-center">
                <p>
                            <span id="tokenprice" className="text-info"><div data-reactroot="">{this.props.priceInWei} wei</div></span><br/>
                                    Price per Power2Peer token</p>
                <p></p></div></div>
                <p>Sale ends at block <span className="text-info ">[NUMBERS]</span>, approximately at Nov 13th 12pm EST. <span className="text-info ">[NUMBERS]</span> blocks remaining.</p>
                <div className="row ">
                <p>        <button onClick={this.props.handleSubmit} className="btn btn-info btn-lg col-sm-4 col-sm-offset-4 ">Buy Tokens!</button></p></div></div>
        );
    }
}


class SaleActionView extends Component {
    render() {
        return (
            <div className="panel-body">
                <h3 className="text-center">Power2Peer token Sale</h3>
                <div className="row">
                <div className="col-sm-4 text-center">
                <p><span id="tokensforsale" className="text-info"><div data-reactroot="">{this.props.totalSupply}</div></span><br/>
                            Power2Peer tokens for sale</p>
                <p></p></div>
                <div className="col-sm-4 text-center">
                <p><span id="tokenssold" className="text-info"><div data-reactroot="">
                <a href={"https://etherscan.io/address/" + this.props.crowdSaleAddress}>{this.props.crowdSaleAddress}</a></div></span>
                </p>
                <p></p></div>
                <div className="col-sm-4 text-center">
                <p>
                            <span id="tokenprice" className="text-info"><div data-reactroot="">{this.props.priceInWei} wei</div></span><br/>
                                    Price per Power2Peer token</p>
                <p></p></div></div>
                <p>Crowdsale addresss can be found above. Follow instructions <a href="#how-to-join-the-token-sale">here</a> to purchase tokens</p>
                <div className="row ">
                <p>        <button onClick={this.props.handleBuy} className="btn btn-info btn-lg col-sm-4 col-sm-offset-4 ">Back to Token Info!</button></p></div></div>
        );
    }
}


export default App
