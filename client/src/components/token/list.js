import React, { Component } from 'react';

import TokenDetail from './detail';


class TokenList extends Component {
    render() {
        return (
            <div className="section">
                <div className="container">
                    <h2 className="header">Deployed Tokens({this.props.tokens.length})</h2>
                    <table className="centered highlight">
                        <thead>
                            <tr>
                                <th>Token Name</th>
                                <th>Symbol</th>
                                <th>Contract Address</th>
                                <th>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tokens.map((token) =>
                                <TokenDetail key={token.deployedAt} token={token} networkId={this.props.networkId} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default TokenList;
