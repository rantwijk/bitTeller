import React, { Component } from 'react'
import axios from 'axios'
import Transactions from './transactions'
import TxWebSocket from './txWebSocket'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coinInfo: {},
      address: '',
      submitted: false
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange (e) {
    e.preventDefault()
    this.setState({ address: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    // I was not able to make a get request because of CORS. Using a proxy was the only solution I could come up with.
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    axios
      .get(`${proxy}blockchain.info/rawaddr/${this.state.address}`)
      .then(res => {
        const coinInfo = res.data
        this.setState({ coinInfo, submitted: true })
      })
      .catch(error => {
        console.log(error.response)
        this.setState({ submitted: false })
        // If I had more time, I'd like to perform better error cheking.
        alert(
          'The Bitcoin address entered is invalid! \n Please check the address and try again.'
        )
      })
  }

  render () {
    const { coinInfo } = this.state
    return (
      <div id='app-container'>
        <div className='search-container'>
          <img id='logo' src='bitexchange.svg' />
          <h1>Bitcoin Teller</h1>
          <p id='tagline'>Uses the Blockhain API to display info on Bitcoin</p>
          <form onSubmit={this.handleSubmit} className='searchContainer'>
            <label>Bitcoin Address:</label>
            <input
              type='text'
              name='address'
              onChange={this.onChange}
              value={this.state.address}
              placeholder='enter bitcoin address'
            />
            <button type='submit'> Submit </button>
          </form>
        </div>
        <div id='coin-info-container'>
          {!this.state.submitted ? (
            <p id='filler-text'>Bitcoin info here...</p>
          ) : (
            ''
          )}
          {this.state.submitted && (
            <div>
              <div id='coin-info'>
                <h3> Coin Info:</h3>
                <ul>
                  <li>
                    <label>Address:</label>
                    {coinInfo.address}
                  </li>
                  <li>
                    <label>Hash:</label> {coinInfo.hash160}
                  </li>
                  <li>
                    <label>Final Balance:</label>
                    {coinInfo.final_balance * 0.00000001}
                  </li>
                  <li>
                    <label>Number of Transactions:</label>
                    {coinInfo.n_tx}
                  </li>
                  <li>
                    <label>Total Coins Received:</label>
                    {coinInfo.total_received * 0.00000001}
                  </li>
                  <li>
                    <label>Total Coins Sent:</label>
                    {coinInfo.total_sent * 0.00000001}
                  </li>
                </ul>
              </div>
              <TxWebSocket coinAddress={this.state.coinInfo.address} />
              <br />
              <Transactions coinInfo={this.state.coinInfo} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
