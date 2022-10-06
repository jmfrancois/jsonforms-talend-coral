import './App.css';
import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { renderers, cells } from '@talend/jsonforms-coral';
import { ThemeProvider } from '@talend/design-system';

const schema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 3,
			description: 'Please enter your name',
		},
	},
};

const uischema = {
	type: 'Control',
	scope: '#/properties/name',
};

const initialData = {};

function App() {
	const [data, setData] = useState(initialData);
	return (
		<ThemeProvider>
			<div>
				<h1>Hello jsonforms</h1>
				<JsonForms
					schema={schema}
					uischema={uischema}
					data={data}
					renderers={renderers}
					cells={cells}
					onChange={({ data, _errors }) => setData(data)}
				/>
			</div>
		</ThemeProvider>
	);
}

export default App;
