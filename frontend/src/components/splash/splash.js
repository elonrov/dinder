import React from 'react'; 
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
            <div>
                <header>
                    <h1>Dinder</h1>
                    <h3>The end of group decision paralysis.</h3>
                    <p>Lorem ipsum dolor sit amet, ex vide graecis mei. Eu wisi facete vocibus vix, eu duo altera oblique. Mel te iisque elaboraret, sea case omnis in. Tota integre sea cu, sumo alterum blandit ei usu. Ad eum molestie assentior incorrupte, ei quem soleat lucilius vim.</p>
                </header>
                <div className={this.state.active ? 'invisible' : 'visible'}>
                    <ul>
                        <li>Step 1
                            <span>content inside step one</span>
                        </li>
                        <li>Step 2
                            <span>content inside step two</span>
                        </li>
                        <li>Step 3
                            <span>content inside step three</span>
                        </li>
                        <li>Step 4
                            <span>content inside step four</span>
                        </li>
                    </ul>
                    <button 
                        onClick={this.toggleClass}>
                        Get Started Now
                    </button>
                </div>
                <section className={this.state.active ? 'visible' : 'invisible'} />
                <SessionForm />
            </div>
        )
    }
}

export default Splash;