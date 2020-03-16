import React from 'react';
import { withRouter } from 'react-router-dom';

class Winner extends React.Component {
    constructor(props) {
        super(props); 

        this.state = { winner: this.props.winner};
        this.hasWinner = this.hasWinner.bind(this);
    }

    hasWinner(session) {

        // if total users equals completed users, concat an array of everyone's rejections without duplicates
        if (session.numUsers === session.completedUsers.length) {
            let rejects = []; 
            session.users.forEach(user => { 
                user.rejections.forEach(rejection => {
                    if (!rejects.includes(rejection)) {
                        rejects.push(rejection);
                    }
                })
            }); 
            
            // iterate through all choices, adding them to new array if no one has rejected them
            let potentialWinners = []; 
            session.choices.forEach(choice => {
                if (!rejects.includes(choice)) {
                    potentialWinners.push(choice);
                }
            });

            // pick a winner from the potentialwinners array, depending on how many options everyone all agreed on
            if (potentialWinners.length === 1) {
                this.setState({ winner: potentialWinners[0] });
            } else if (potentialWinners.length === 0 ) {
                this.setState({ winner: "pizza" });
            } else {
                this.setState({ winner: potentialWinners[Math.floor(Math.random() * (potentialWinners.length - 1))]} );
            }
            
            // send winner up with updateSession request
            this.props.updateWinner({winner: this.state.winner});
        } else {
            // if no winner (aka round isn't over) but someone tries to go to /winner, redirect them
            this.props.history.push('/thankyou')
        }
    };

    componentDidMount() {
        const sessionId = this.props.match.params.sessionId;
        this.props.fetchSession(sessionId)
            // .then(sessionAction => { 
            //     return this.hasWinner(sessionAction.session);
            // });
        this.props.fetchSessionUsers(sessionId);
    }

    render () {

        if (Object.keys(this.props.session).length === 0) return <h1 className="winner-loading">Determining Winner...</h1>;
        const { winner } = this.state;
            return (
                <section className="winner-message">
                    <h2>winner</h2>
                    <h2>winner</h2>
                    <h1>{winner}</h1>
                    {/* <h2>chicken</h2> */}
                    <h2>dinner</h2>
                </section>
            )
    };
}; 

export default withRouter(Winner);

