import React from 'react';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <h1>STRIVE</h1>
                </header>
                <div id='welcome'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
