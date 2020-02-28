import React from 'react'; 
import './splash.css';
import SessionForm from '../session_form/session_form_container';

class Splash extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { active: false }
        this.toggleClass = this.toggleClass.bind(this);
    };

    toggleClass() {
        const currentState = this.state.active;
        this.setState( {active: !currentState} )
    };

    render () {
        return (
            <section className="splash-all">
                <header className="header">
                    <h1>dinder</h1>
                    <h3>the end of group decision paralysis</h3>
                </header>
                <div className={this.state.active ? 'invisible' : 'visible'}>
                    <p className="about">Can't decide where to get dinner with your friends? Dinder is here to help.</p>
                    <ul className="how-to">
                        <li><div className="step-number">1</div>
                            <span>Invite your friends via email on the next page.</span>
                        </li>
                        <li><div className="step-number">2</div>
                            <span>Dinder will generate options based on your given location and price range. </span>
                        </li>
                        <li><div className="step-number">3</div>
                            <span>Follow the link in your email to begin the matching round and submit your preferences.</span>
                        </li>
                        <li><div className="step-number">4</div>
                            <span>We'll find a match that you and your friends will all enjoy.</span>
                        </li>
                    </ul>
                    <div className="submit">
                        <button 
                            className="get-started"
                            onClick={this.toggleClass}>
                            Get Started Now
                        </button>
                    </div>
                </div>
                <section className={!this.state.active ? 'invisible' : 'visible'}>
                    <span><SessionForm /></span>
                    <div className="submit">
                        <button className="refresh" onClick={this.toggleClass}>Take me back.</button>
                    </div>
                </section>
            </section>
        )
    }
}

export default Splash;