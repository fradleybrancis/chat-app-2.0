import React from 'react';
import './App.css';
import Chatroom from './Chatroom';
import { animals } from './data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      hasUsername: false,
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.generateName = this.generateName.bind(this);
    this.redirect = this.redirect.bind(this);
  };

  generateName() {
    const random = (list) => list[Math.floor(Math.random() * list.length)];
    this.setState({ username: random(animals) });
  };

  updateUsername(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  redirect(e) {
    e.preventDefault();
    this.setState({ hasUsername: true });
  };

  render() {
    const { hasUsername, username } = this.state;
    return (
      <>
        {
          !hasUsername && (
            <div>
              <h1 className="welcome">Welcome to Allganize Chat!</h1>
              <h4 className="welcome">create a username or generate a random one</h4>
              <div>
                <form onSubmit={this.redirect} className="login">
                  <input autoComplete="off" type="text" name="username" value={username} onChange={this.updateUsername}/>
                  <button>Go!</button>
                </form>
              </div>
              <div>
                <button className="generate" onClick={this.generateName}>Generate Random</button>
              </div>
            </div>
          )
        }
        {
          hasUsername && <Chatroom username={username} />
        }
      </>
    );
  }
}
 
export default App;
