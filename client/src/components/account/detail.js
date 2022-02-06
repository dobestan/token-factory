import React, { Component } from 'react';

import getEtherscanURL from '../../helpers/etherscan';


class AccountDetail extends Component {
    render() {
        return (
            <div className="section">
                <div className="container">
                    <h2>Connected Wallet</h2>
                    <ul>
                        <li>{(this.props.account && this.props.balance) ? "✅" : null} Account: <a href={getEtherscanURL(this.props.account, this.props.networkId)} target="_blank">{this.props.account}</a></li>
                        <li>{(this.props.account && this.props.balance) ? "✅" : null} Balance: {this.props.balance} ETH</li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default AccountDetail;
