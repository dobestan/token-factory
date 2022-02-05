import React, { Component } from 'react';

import getWeb3 from "./getWeb3";

import FactoryContract from "./contracts/Factory.json";

import AccountDetail from "./components/account/detail";
import TokenList from "./components/token/list";

import logo from './logo.svg';
import './App.css';


const DEPLOYED_FACTORY_CONTRACT_ADDRESS = "0x75ea6bca6d9b6e26368ff6a28cf0a74b6c338e7d";


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
        };
    }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            factory = new web3.eth.Contract(
                FactoryContract.abi,
                DEPLOYED_FACTORY_CONTRACT_ADDRESS
            );
            const tokens = await factory.methods.getTokens().call();
            this.setState({
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

    createToken = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const symbol = event.target.symbol.value;
        const initial = event.target.initial.value;

        factory.methods.createToken(name, symbol, initial).send({from: this.state.account});
        // #TODO: this method is not tested due to high tx fee on mainnet.
        // should change to testnet for development.
    }

    render() {
        return (
            <div>
                <h1>Token Factory</h1>
                <p>{this.state.factory}</p>

                <AccountDetail account={this.state.account} balance={this.state.balance} />
                <h1>Create Token Form</h1>
                <form onSubmit={this.createToken}>
                    <input name="name" type="text" placeholder="Token Name" required />
                    <input name="symbol" type="text" placeholder="Token Symbol" required />
                    <input name="initial" type="number" placeholder="Initial Tokens" required />
                    <input type="submit" />
                </form>
                <TokenList tokens={this.state.tokens} />
            </div>
        );
    }
}


export default App;
