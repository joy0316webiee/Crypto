import React from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async() => {
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});
    console.log(coinList);
  }

  confirmFavorites = () => {
    console.log('Hello ');
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      test: 'hello'
    }));
  }

  savedSettings() {
    let crypoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if ( ! crypoDashData ) {
      return { page: 'settings', firstVisit: true };
    }
  }

  setPage = page => this.setState({page});

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}