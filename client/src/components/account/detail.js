import React, { Component } from 'react';


class AccountDetail extends Component {
    getEtherscanURL = (address) => {
        // #TODO: duplicated. should refactor to helper function
        return "https://etherscan.io/address/" + address;
    }

    render() {
        return (
            <div>
                <h1>Account</h1>
                <p>connected to <a href={this.getEtherscanURL(this.props.account)}>{this.props.account}({this.props.balance} ETH)</a></p>
            </div>
        )
    }
}


export default AccountDetail;
