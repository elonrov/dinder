import React from 'react';
import './thank_you.css';

class ThankYou extends React.Component {

    render () {
        return (
            <div>
                <section className="thank-you">
                    <header><h2>Thank you for using</h2><h1>dinder!</h1></header>
                    <div className="details">
                    <h3>Check your email for a link to begin your matching round.</h3>
                    <h5>We'll notify you once you and all of your friends have completed 
                        your matching rounds and we've found a spot for you to 
                        eat that you all approve of.</h5>
                    </div>
                    <p>Dinder was created by <br />Akeem Nicholas, <br />Calvin Curnuck, <br />Elon Rov, <br />and Harry Zec. <br /><br />Explore dinder's codebase and find more of our work on <a href="github.com">GitHub.</a></p>
                    {/* <ul>
                        <li><img src=""/></li>
                    </ul> */}
                </section>
            </div>
        )
    }
}

export default ThankYou;