import React from 'react'
import { getUser } from './services/auth'

class Main extends React.Component {
  state = { loading: false, json: null, name: '', notes: '' }
  handleClick = e => {
    e.preventDefault()
    const user = getUser()
    this.setState({ loading: true })
    fetch('/.netlify/functions/auth-hello', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token.access_token,
      },
    })
      .then(response => response.json())
      .then(json => this.setState({ loading: false, json }))
  }

  handleSubmit = e => {
    const data = {
        "Name": this.state.name, 
        "Notes": this.state.notes
      }
      fetch("../../.netlify/functions/airtable", {
      method: "POST",
      body: JSON.stringify(data)
      })
      .then(() => alert("Form Sent!"))
      .catch(error => alert(error))
  
      e.preventDefault();
   }

  render() {
    const { loading, json } = this.state
    const user = getUser()
    return (
      <>
        <h1>Your Main App</h1>
        <ul>
          <li>API: {user.api && user.api.apiURL}</li>
          <li>ID: {user.id}</li>
        </ul>
        <hr />

        <button onClick={this.handleClick}>
          {loading ? 'Loading...' : 'Call Lambda Function'}
        </button>
        <pre>{JSON.stringify(json, null, 2)}</pre>

        <form onSubmit={this.handleSubmit}>
          <label for="name">Name</label>
          <input id="name" onChange={(e) => this.setState({ name: e.currentTarget.value })} />
          <label for="notes">Notes</label>
          <textarea id="notes" onChange={(e) => this.setState({ notes: e.currentTarget.value })}  />
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default Main
