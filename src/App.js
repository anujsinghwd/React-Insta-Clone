import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';


const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <div className="App">
            <Header />
            <section className="App-main">
              <Posts />
            </section>
          </div>
        </ApolloProvider>
    );
  }
}

export default App;
