import { render, screen } from '@testing-library/react';
import { App } from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

test('renders learn react link', () => {
	i18n.use(initReactI18next).init({
		react: {
			useSuspense: false,
		},
	});

	render(<App />);
	const linkElement = screen.getByText(/Configure jsonform/i);
	expect(linkElement).toBeInTheDocument();
});
