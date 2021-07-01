import React from 'react';

export class Header extends Component {
  render() {
    return (
      <div>
        <Col>
          <h1>myFlix Movie Database</h1>
        </Col>
      </div>
    );
  }
}

//  connect this function to a future logout button
//  this button should go in a future header component
//  the following is the code for said button
/*    onLoggedOut is located in MainView
<button onClick={() => { this.onLoggedOut() }}>Logout</button>
  */
