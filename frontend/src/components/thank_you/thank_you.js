import React from 'react';
import './thank_you.css';

class ThankYou extends React.Component {

    render () {
        return (
            <div>
                <header className="thank-you">
                    <h1>Thank you for using dinder!</h1>
                    <h3>Check your email for a link to begin your matching round.</h3>
                    <h5>We'll notify you once you and all of your friends have completed 
                        your matching rounds and we've found a spot for you to 
                        eat that you all approve of.</h5>
                    <p>dinder was created by Akeem Nicholas, Calvin Curnuck, Elon Rov, and Harry Zec. Explore dinder's codebase, and find more of our work, on GitHub.</p>
                    <ul>
                        <li><img src=""/></li>
                    </ul>
                </header>
            </div>
        )
    }
}

export default ThankYou;