import React from 'react'; 

class SessionForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            emails: {
                hostEmail: "",
                friend1Email: "",
                friend2Email: "",
                friend3Email: ""
            },
            total: 1
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    incrementUserCount () {
        this.setState({total: this.state.total + 1})
    }

    handleSubmit (e) {
        e.preventDefault();
        // email situation
    }

    update(field) {
        return e => this.setState({emails: {[field]: e.target.value }});
    }


    render () {
        return (
            <div>
                <form className="session-form" onSubmit={this.handleSubmit}>
                    <label>Your email
                        <input
                            type="text"
                            placeholder="hostwiththemost@dinder.com"
                            value={this.state.emails.hostEmail}
                            onChange={this.update('Your email')}
                        />
                    </label>
                    <br />
                    <section>Your friends' emails
                        <br />
                        <label>Friend #1
                            <input 
                                className="friend-1-input"
                                type="text"
                                placehold="This isn't Myspace, order doesn't matter"
                                value={this.state.emails.friend1Email}
                                onChange={this.update('Friend #1')}
                            />
                            {/* plus sign to reveal next row and increment counter */}
                        </label>
                        <br />
                        <label>Friend #2
                            <input
                                className="friend-2-input"
                                type="text"
                                value={this.state.emails.friend2Email}
                                onChange={this.update('Friend #2')}
                            />
                        </label>
                        <br />
                        <label>Friend #3
                            <input
                                className="friend-3-input"                            
                                type="text"
                                value={this.state.emails.friend3Email}
                                onChange={this.update('Friend #3')}
                            />
                        </label>
                        <br />
                        <label>Friend #4
                            <input
                                className="friend-4-input"
                                type="text"
                                value={this.state.emails.friend4Email}
                                onChange={this.update('Friend #4')}
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