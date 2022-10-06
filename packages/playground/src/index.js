import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import './index.css';
import App from './App';
i18n.use(initReactI18next).init({
	react: {
		useSuspense: false,
	},
});

ReactDOM.render(<App />, document.getElementById('root'));
