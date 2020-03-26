import React from 'react';
import './thank_you.css';

class ThankYou extends React.Component {

    render () {

        return (
            <div>
                <section className="thank-you">
                    <header><h2>Thank you for using</h2><h1>dinder!</h1></header>
                    <div className="details">
                    <h3>Keep an eye on your email for next steps.</h3>
                    <h5>
                        We'll notify you once you and all of your friends have completed 
                        your matching rounds and we've found a spot for you to 
                        eat that you all approve of.
                    </h5>
                    </div>
                    <div className="created-by">
                        dinder was created by <br />
                        <a className="link" rel="noopener noreferrer" target="_blank" href="http://www.akeemnicholas.com">Akeem Nicholas</a> <br />
                        <a className="link" rel="noopener noreferrer" target="_blank" href="http://www.calvincurnuck.com">Calvin Curnuck</a> <br />
                        <a className="link" rel="noopener noreferrer" target="_blank" href="http://www.elonrov.com">Elon Rov</a> <br />and <br />
                        <a className="link" rel="noopener noreferrer" target="_blank" href="https://harryzec.github.io/">Harry Zec</a> <br />Explore dinder's codebase and find more of our work on 
                        <a className="link" href="https://github.com/elonrov/dinder"> GitHub</a>.
                    </div>
                    <a href="https://dinderparty.herokuapp.com/#/">
                        <div className="home-link">about dinder</div>
                    </a>
                </section>
            </div>
        )
    }
}

export default ThankYou;

