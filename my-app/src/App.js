import React, { Component } from 'react';
import './App.css';
import axios from "axios"

class App extends Component {
  constructor(){
    super();
    this.state = {
      profile: [],
      followers:[],
      userText: "",
      error: ""
    };
  }

  componentDidMount(){
    axios
    .get("https://api.github.com/users/marissa-shaffer")
    .then(res => {
      this.setState({
        profile: res.data
      });
    })
    .catch(err => console.log("no profiles", err));

    axios
      .get("https://api.github.com/users/marissa-shaffer/followers")
      .then(res => {
        this.setState({
          followers: res.data
        });
      })
      .catch(err => console.log("no followers", err));
  }

  handleChanges = e => {
    this.setState({ userText: e.target.value});
    console.log(e.target.value);
  };

  componentDidUpdate() {
    console.log("componentDidIpdate running");

    axios
      .get(`https://api.github.com/users/${this.state.userText}`)
      .then(res => {
        this.setState({
          profile: res.data
        });
      })
      .catch(err => console.log("no profiles", err));

      axios
        .get(`https://api.github.com/users/${this.state.userText}/followers`)
        .then(res => {
          this.setState({
            followers: res.data
          });
        })
        .catch(err => console.log("no followers", err));
    }
  
  fetchUser = e => {
    e.preventDefault();

    axios
      .get(`https://api.github.com/users/${this.state.userText}/followers`)
      .then(res => {
        this.setState({
          followers: res.data
        });
      })
      .catch (err => console.log(err)); 
  }

  render() {
    console.log("render running")
    return (
      <div className="App">
        <h1>User github</h1>
        <div>
          <p>
            <img src={this.state.profile.avatar_url} />
          </p>
          <p>{this.state.profile.login}</p>
          <p>Profile: 
            <a href={this.state.profile.html_url}>
              {this.state.profile.html_url}
            </a>
          </p>
          <p>followers: {this.state.profile.followers}</p>
        </div>
        
      </div> //App
    );
  }
}



export default App;
