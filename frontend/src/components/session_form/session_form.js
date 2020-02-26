import React from 'react'; 

class SessionForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            emails: {
                hostEmail: "",
                friend1Email: "",
                friend2Email: "",
                friend3Email: "",
                friend4Email: ""
            },
            // total: 1 // do we need this? revisit for making form dynamic
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createUsers = this.createUsers.bind(this);

    }

    createUsers(sessionId) {
        const emails = this.state.emails;
        for (let email in emails) {
            if (emails[email]) {
                this.props.createUser({
                    session: sessionId,
                    email
                });
            }
        }
    }

    userCount() {
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
        const numUsers = this.userCount();
        this.props.createSession({ numUsers })
            .then(session => {
                this.props.history.push(`/round?${session.id}`);
                createUsers(session.id);
            }); // maybe have to do ._id? not sure what id is name in mongo
    }

    update(field) {
        return e => this.setState({emails: {[field]: e.target.value }}); //updates email value in state
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
                            value={this.state.emails.hostEmail}
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
                                value={this.state.emails.friend1Email}
                                onChange={this.update('friend1Email')}
                            />
                            {/* plus sign to reveal next row and increment counter */}
                        </label>
                        <br />
                        <label>Friend #2
                            <input
                                className="friend-2-input"
                                type="email"
                                value={this.state.emails.friend2Email}
                                onChange={this.update('friend2Email')}
                            />
                        </label>
                        <br />
                        <label>Friend #3
                            <input
                                className="friend-3-input"                            
                                type="email"
                                value={this.state.emails.friend3Email}
                                onChange={this.update('friend3Email')}
                            />
                        </label>
                        <br />
                        <label>Friend #4
                            <input
                                className="friend-4-input"
                                type="email"
                                value={this.state.emails.friend4Email}
                                onChange={this.update('friend4Email')}
                            />
                        </label>
                    </section>
                    <button className="submit-button" type="submit">Send Invites</button>
                </form>
            </div>
        )
    }
}; 

export default SessionForm; 