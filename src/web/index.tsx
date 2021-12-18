import React from 'react';
import ReactDOM from 'react-dom';

import {Clock} from './components/clock';

import './index.css';

const App: React.FC = () => {
  return (
    <div className="square">
        <Clock />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
