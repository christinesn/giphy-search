import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import moxios from 'moxios'

beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Fetches search results', () => {
  
})