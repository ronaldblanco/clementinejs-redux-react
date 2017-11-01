
import React from 'react'
import CreateLocalComponent from './CreateLocal.jsx'

export class CreateLocalPage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return (
      <CreateLocalComponent onSubmit={this.submit} />
    )
  }
}
