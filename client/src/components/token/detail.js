import React, { Component } from 'react';


class TokenDetail extends Component {
    getEtherscanURL = (address) => {
        return "https://etherscan.io/address/" + address;
    }

    render() {
        const token = this.props.token;
        return (
            <li>
                <a href={this.getEtherscanURL(token.deployedAt)}>
                    {token.name}({token.symbol})
                </a>
            </li>
        )
    }
}


export default TokenDetail;
