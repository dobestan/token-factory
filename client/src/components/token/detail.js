import React, { Component } from 'react';

import getEtherscanURL from '../../helpers/etherscan';


class TokenDetail extends Component {
    render() {
        const token = this.props.token;
        console.log(token.deployedAt);
        return (
            <li>
                <a href={getEtherscanURL(token.deployedAt, this.props.networkId)}>
                    {token.name}({token.symbol})
                </a>
            </li>
        )
    }
}


export default TokenDetail;
