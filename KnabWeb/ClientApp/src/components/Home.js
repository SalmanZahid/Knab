import React, { Component } from 'react';
import Quote from './Quote';

export class Home extends Component {

  appliedSearchText = '';

  constructor(props) {
    super(props);
    this.state = { 
      search: "",
      quotes: [],
      noResult: false,
      loading: false
    };

    this.getQuote = this.getQuote.bind(this);
  }

  render () {
    return (
      <div>
        <h1>Crypto Currency Exchange!</h1>
        <p>I will help you to find rates for your crypto codes</p>

        <form onSubmit={this.getQuote} method="post" class="mt-3">
          <label class="col-12 col-lg-5 px-0">
            Enter Crypto currency code:
            <input type="text" value={this.state.search} class="ml-3" maxLength="10" required onChange={evt => this.updateInputValue(evt)} />
          </label>
          <input type="submit" class="btn btn-success mt-2 mt-lg-0"  value="Search" />
        </form>        
        {this.state.loading}
        <Quote quotes={this.state.quotes} loading={this.state.loading} noResult={this.state.noResult} searchedText={this.appliedSearchText} />
      </div>
    );
  }

  updateInputValue(evt) {
    this.setState({
      search: evt.target.value      
    });
  }

  async getQuote(event) {
    event.preventDefault();
    this.appliedSearchText = this.state.search;
    this.setState({ quotes: [], loading: true, noResult: false });
    
    const response = await fetch('api/rates?code=' + this.appliedSearchText);

    if (await response.ok) {    
        const data = await response.json();
        if(data.length > 0) {
          this.setState({ quotes: data, loading: false, noResult: false });
        } else {
          this.setState({ loading: false, noResult: true });
        }
    } else {
        this.setState({ loading: false, noResult: true });
    }
  }
}
