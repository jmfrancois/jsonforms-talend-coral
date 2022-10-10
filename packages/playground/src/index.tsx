import * as React from 'react';
import * as ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { App } from './App';

import './index.css';

i18n.use(initReactI18next).init({
	react: {
		useSuspense: false,
	},
});

ReactDOM.render(<App />, document.getElementById('root'));
