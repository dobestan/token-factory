import React, { Component } from 'react';


class TokenCreate extends Component {
    createToken = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const symbol = event.target.symbol.value;
        const initial = event.target.initial.value;

        this.props.factory.methods.createToken(name, symbol, initial).send({from: this.props.account});
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <h2>Create Token Form</h2>
                    <form onSubmit={this.createToken}>
                        <div className="input-field">
                            <input name="name" type="text" placeholder="Token Name" required />
                            <label for="name">Token Name</label>
                        </div>
                        <div className="input-field">
                            <input name="symbol" type="text" placeholder="Token Symbol" required />
                            <label for="symbol">Token Name</label>
                        </div>
                        <div className="input-field">
                            <input name="initial" type="number" placeholder="Initial Tokens" required />
                            <label for="initial">Initial Token Amounts</label>
                        </div>
                        <div className="input-field">
                            <button class="btn waves-effect waves-light" type="submit" name="action">
                                Create Token
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default TokenCreate;
