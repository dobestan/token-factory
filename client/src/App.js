import React, { Component } from 'react';
import getWeb3 from "./getWeb3";

import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
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
