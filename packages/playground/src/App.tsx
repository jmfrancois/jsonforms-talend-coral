import './App.css';
import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { renderers, cells } from '@talend/jsonforms-coral';
import { Form, ThemeProvider } from '@talend/design-system';

const schema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
		},
		description: {
			type: 'string',
		},
		done: {
			type: 'boolean',
		},
		dueDate: {
			type: 'string',
			format: 'date',
		},
		rating: {
			type: 'integer',
			maximum: 5,
		},
	},
	required: ['name'],
};

const uischema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Control',
			scope: '#/properties/name',
		},
		{
			type: 'Control',
			scope: '#/properties/done',
		},
		{
			type: 'Control',
			scope: '#/properties/description',
			options: {
				multi: true,
			},
		},
		{
			type: 'Control',
			scope: '#/properties/dueDate',
		},
		{
			type: 'Control',
			scope: '#/properties/rating',
		},
	],
};

const initialData = {};

export function App() {
	const [data, setData] = React.useState(initialData);
	console.log({ renderers });
	return (
		<ThemeProvider>
			<ThemeProvider.GlobalStyle />
			<div style={{ padding: 20, width: 900 }}>
				<h1>Hello jsonforms</h1>
				<Form>
					<JsonForms
						schema={schema}
						uischema={uischema}
						data={data}
						renderers={renderers}
						cells={cells}
						onChange={({ data }) => setData(data)}
					/>
				</Form>
			</div>
		</ThemeProvider>
	);
}
