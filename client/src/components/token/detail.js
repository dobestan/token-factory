import React, { Component } from 'react';

import getEtherscanURL from '../../helpers/etherscan';


class TokenDetail extends Component {
    render() {
        const token = this.props.token;
        return (
            <tr>
                <td>{token.name}</td>
                <td>{token.symbol}</td>
                <td><a href={getEtherscanURL(token.deployedAt, this.props.networkId)} target="_blank">{token.deployedAt}</a></td>
                <td><a href={getEtherscanURL(token.owner, this.props.networkId)} target="_blank">{token.owner}</a></td>
            </tr>
        )
    }
}


export default TokenDetail;
