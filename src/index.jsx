import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view.jsx';
import Container from 'react-bootstrap/Container';

//  Import statement to indicate that you need to bundle
//  './index.scss'
import './index.scss';

//  Main component (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

//  Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//  tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
