import React from 'react'; 
import './session_form.css';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            hostEmail: "",
            friend1Email: "",
            friend2Email: "",
            friend3Email: "",
            friend4Email: ""
            // total: 1 // do we need this? revisit for making form dynamic
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createUsers = this.createUsers.bind(this);

    }

    createUsers(sessionId) {
        const emails = this.state;
        debugger
        for (let email in emails) {
            debugger
            if (emails[email]) {
                this.props.createUser({
                    session: sessionId,
                    email
                });
            }
        }
    }

    userCount(emails) {
        let count = 0;
        for (let email in emails) {
            if (emails[email]) {
                count++;
            }
        }

        return count
    }

    incrementUserCount () {
        this.setState({total: this.state.total + 1}) // increments total in state on click
    }

    handleSubmit (e) {
        e.preventDefault();

        const numUsers = this.userCount(this.state);
        this.props.createSession({ numUsers })
            .then(session => {
                debugger
                this.props.history.push(`/round?${session.id}`);
                this.props.createUsers(session.id);
            }); // maybe have to do ._id? not sure what id is name in mongo
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value }); //updates email value in state
    }

    // verifyEmail


    render () {
        return (
            <div>
                <form className="session-form" onSubmit={this.handleSubmit}>
                    <label>Your email
                        <input
                            type="email"
                            placeholder="hostwiththemost@dinder.com"
                            value={this.state.hostEmail}
                            onChange={this.update('hostEmail')}
                        />
                    </label>
                    <br />
                    <section>Your friends' emails
                        <br />
                        <label>Friend #1
                            <input 
                                className="friend-1-input"
                                type="email"
                                placehold="This isn't Myspace, order doesn't matter"
                                value={this.state.friend1Email}
                                onChange={this.update('friend1Email')}
                            />
                            {/* plus sign to reveal next row and increment counter */}
                        </label>
                        <br />
                        <label>Friend #2
                            <input
                                className="friend-2-input"
                                type="email"
                                value={this.state.friend2Email}
                                onChange={this.update('friend2Email')}
                            />
                        </label>
                        <br />
                        <label>Friend #3
                            <input
                                className="friend-3-input"                            
                                type="email"
                                value={this.state.friend3Email}
                                onChange={this.update('friend3Email')}
                            />
                        </label>
                        <br />
                        <label>Friend #4
                            <input
                                className="friend-4-input"
                                type="email"
                                value={this.state.friend4Email}
                                onChange={this.update('friend4Email')}
                            />
                        </label>
                        
                        <section>
                            <br />
                            <label>Your friends' emails
                                <br />
                                <input 
                                    className="friend-1-input"
                                    type="text"
                                    placeholder="Friend #1's Email"
                                    value={this.state.emails.friend1Email}
                                    onChange={this.update('Friend #1')}
                                />
                                {/* plus sign to reveal next row and increment counter */}
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-2-input"
                                    type="text"
                                    placeholder="Friend #3's Email"
                                    value={this.state.emails.friend2Email}
                                    onChange={this.update('Friend #2')}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-4-input"                            
                                    type="text"
                                    placeholder="Friend #3's Email"
                                    value={this.state.emails.friend3Email}
                                    onChange={this.update('Friend #3')}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-4-input"
                                    type="text"
                                    placeholder="Friend #4's Email"
                                    value={this.state.emails.friend4Email}
                                    onChange={this.update('Friend #4')}
                                />
                            </label>
                            <h5>* This isn't Myspace, order doesn't matter *<br /></h5>
                        </section>
                    </section>
                    <div className="submit">
                        <button className="get-started" type="submit">Send Invites</button>
                    </div>
                </form>
            </div>
        )
    }
}; 

export default withRouter(SessionForm); 