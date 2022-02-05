import React, { Component } from 'react';

import TokenDetail from './detail';


class TokenList extends Component {
    render() {
        return (
            <div>
                <h1>Tokens({this.props.tokens.length})</h1>
                {this.props.tokens.map((token) =>
                    <TokenDetail key={token.deployedAt} token={token} />
                )}
            </div>
        )
    }
}


export default TokenList;
