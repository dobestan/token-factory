import React, { Component } from 'react';

import getWeb3 from "./getWeb3";

import FactoryContract from "./contracts/Factory.json";

import AccountDetail from "./components/account/detail";
import TokenCreate from "./components/token/create";
import TokenList from "./components/token/list";

import logo from './logo.svg';
import './App.css';


const DEPLOYED_FACTORY_CONTRACT_ADDRESS_MAINNET = "0x75ea6bca6d9b6e26368ff6a28cf0a74b6c338e7d";
const DEPLOYED_FACTORY_CONTRACT_ADDRESS_RINKEBY = "0xd787d5db2b26b111b9998aed91aabf86f8af86f9";
let DEPLOYED_FACTORY_CONTRACT_ADDRESS;


let factory;


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokens: [],
            factory: DEPLOYED_FACTORY_CONTRACT_ADDRESS,
            account: [],
            balance: 0,

            name: "",
            symbol: "",
            initial: 0,

            web3: null,
            networkId: null,
        };
    }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            const networkId = await web3.eth.net.getId();
            if (networkId == 1) {
                DEPLOYED_FACTORY_CONTRACT_ADDRESS = DEPLOYED_FACTORY_CONTRACT_ADDRESS_MAINNET;
            } else if (networkId == 4) {
                DEPLOYED_FACTORY_CONTRACT_ADDRESS = DEPLOYED_FACTORY_CONTRACT_ADDRESS_RINKEBY;
            }

            factory = new web3.eth.Contract(
                FactoryContract.abi,
                DEPLOYED_FACTORY_CONTRACT_ADDRESS
            );
            const tokens = await factory.methods.getTokens().call();
            this.setState({
                web3,
                networkId,
                account,
                tokens,
            });
            const balance = await web3.eth.getBalance(account);
            this.setState({
                balance: web3.utils.fromWei(balance, "ether"),
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <h1 className="header center">ERC-20 Token Factory</h1>
                    <blockquote>
                        Ethereum Mainnet gas fee is <a href="https://etherscan.io/tx/0x7e2544d6e462b1da65b9c1ff203365b214562f99ca5798815c8b8efb76bba86a" target="_blank">too expensive.</a><br/>
                        I highly recommend to use Rinkeby Testnet for test purposes.
                    </blockquote>
                </div>

                <AccountDetail
                    account={this.state.account}
                    networkId={this.state.networkId}
                    balance={this.state.balance}
                />

                <TokenCreate
                    account={this.state.account}
                    factory={factory}
                />

                <TokenList
                    tokens={this.state.tokens}
                    networkId={this.state.networkId}
                />
            </div>
        );
    }
}


export default App;
