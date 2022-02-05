import React, { Component } from 'react';

import getWeb3 from "./getWeb3";

import FactoryContract from "./contracts/Factory.json";

import AccountDetail from "./components/account/detail";
import TokenList from "./components/token/list";

import logo from './logo.svg';
import './App.css';


const DEPLOYED_FACTORY_CONTRACT_ADDRESS = "0x75ea6bca6d9b6e26368ff6a28cf0a74b6c338e7d";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokens: [],
            factory: DEPLOYED_FACTORY_CONTRACT_ADDRESS,
            accounts: [],
        };
    }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();

            const factory = new web3.eth.Contract(
                FactoryContract.abi,
                DEPLOYED_FACTORY_CONTRACT_ADDRESS
            );
            const tokens = await factory.methods.getTokens().call();
            this.setState({
                accounts,
                tokens,
            });

            console.log(accounts);
            console.log(tokens);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <h1>Token Factory</h1>
                <p>{this.state.factory}</p>

                <AccountDetail account={this.state.accounts[0]} />
                <TokenList tokens={this.state.tokens} />
            </div>
        );
    }
}


export default App;
