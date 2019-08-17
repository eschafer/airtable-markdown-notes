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
        <form onSubmit={this.handleSubmit}>
          <div>
            <label for="name">Name</label>
            <input id="name" onChange={(e) => this.setState({ name: e.currentTarget.value })} />
          </div>
          <div>
            <label for="notes">Notes</label>
            <textarea id="notes" onChange={(e) => this.setState({ notes: e.currentTarget.value })}  />
          </div>
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default Main
