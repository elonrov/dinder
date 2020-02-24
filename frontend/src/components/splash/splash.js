import React from 'react'; 

class Splash extends React.Component {
    constructor(props) {
        super(props); 
    
        this.state = { active: false }
    };

    addActiveClass() {
        this.setState( {active: true} )
    }

    render () {
        <div>
            <header>
                <h1>Dinder</h1>
                <h3>The end of group decision paralysis.</h3>
                <p>Lorem ipsum dolor sit amet, ex vide graecis mei. Eu wisi facete vocibus vix, eu duo altera oblique. Mel te iisque elaboraret, sea case omnis in. Tota integre sea cu, sumo alterum blandit ei usu. Ad eum molestie assentior incorrupte, ei quem soleat lucilius vim.</p>
            </header>
            <div className="visible">
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
                <button>
                    Get Started Now
                </button>
            </div>
            <SessionForm className="invisible"/>
        </div>
    }
}