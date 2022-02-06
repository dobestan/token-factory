import React, { Component } from 'react';

import getEtherscanURL from '../../helpers/etherscan';


class AccountDetail extends Component {
    render() {
        return (
            <div>
                <h1>Account</h1>
                <p>connected to <a href={getEtherscanURL(this.props.account, this.props.networkId)}>{this.props.account}({this.props.balance} ETH)</a></p>
            </div>
        )
    }
}


export default AccountDetail;
