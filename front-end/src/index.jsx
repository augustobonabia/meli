import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';
import App from './core/App';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

WebFont.load({
  google: {
    families: ['Proxima Nova:300,400,700', 'Roboto:300,400,700'],
  },
});
