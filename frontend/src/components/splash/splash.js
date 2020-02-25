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
                    <h3>the end of group decision paralysis.</h3>
                </header>
                <div className={this.state.active ? 'invisible' : 'visible'}>
                    <p className="about">Can't decide where to get dinner with your friends? Dinder is here to help. Leave no room for that bossy friend to bulldoze or for that flakey friend to spend hours going back and forth.</p>
                    <ul className="how-to">
                        <li>step 1
                            <br />
                            <span>Invite your friends via email below.</span>
                        </li>
                        <li>step 2
                            <br />
                            <span>For each option, let us know if you're def down or def not down. </span>
                        </li>
                        <li>step 3
                            <br />
                            <span>Based on you preferences, we'll pick a spot for you to meet that you'll all enjoy.</span>
                        </li>
                        <li>step 4
                            <br />
                            <span>Meet up, eat up, and sldfsldkfj.</span>
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
                </section>
            </section>
        )
    }
}

export default Splash;