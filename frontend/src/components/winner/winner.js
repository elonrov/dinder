import React from 'react';

class Winner extends React.Component {
    constructor(props) {
        super(props); 

    }

    render () {
        const { winner } = this.state;

        return (
            <section>
                <h1>winner</h1>
                <h1>winner</h1>
                {/* <h1>{winner}</h1> */}
                <h1>chicken</h1>
                <h1>dinder</h1>
            </section>
        )
    }
}; 

export default Winner;

