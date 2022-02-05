import React, { Component } from 'react';

import getWeb3 from "./getWeb3";

import FactoryContract from "./contracts/Factory.json";

import logo from './logo.svg';
import './App.css';


const DEPLOYED_FACTORY_CONTRACT_ADDRESS = "0x75ea6bca6d9b6e26368ff6a28cf0a74b6c338e7d";


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FactoryContract.networks[networkId];
            const instance = new web3.eth.Contract(
                FactoryContract.abi,
                DEPLOYED_FACTORY_CONTRACT_ADDRESS
            );
            const tokens = await instance.methods.getTokens().call();
            console.log(tokens);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <h1>Token Factory</h1>
            </div>
        );
    }
}


export default App;
