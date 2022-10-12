import './App.css';
import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { renderers, cells } from '@talend/jsonforms-coral';
import { Form, ThemeProvider } from '@talend/design-system';

const schema = {
	type: 'object',
	properties: {
		string: {
			type: 'string',
			minLength: 1,
		},
		stringmulti: {
			type: 'string',
		},
		boolean: {
			type: 'boolean',
		},
		date: {
			type: 'string',
			format: 'date',
		},
		time: {
			type: 'string',
			format: 'time',
		},
		datetime: {
			type: 'string',
			format: 'date-time',
		},
		integer: {
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
			scope: '#/properties/boolean',
		},
		{
			type: 'Control',
			scope: '#/properties/boolean',
			options: {
				toggle: true,
			},
		},
		{
			type: 'Control',
			scope: '#/properties/string',
		},
		{
			type: 'Control',
			scope: '#/properties/stringmulti',
			options: {
				multi: true,
			},
		},
		{
			type: 'Control',
			scope: '#/properties/date',
		},
		{
			type: 'Control',
			scope: '#/properties/time',
		},
		{
			type: 'Control',
			scope: '#/properties/datetime',
		},
		{
			type: 'Control',
			scope: '#/properties/integer',
		},
	],
};

const initialData = {};

export function App() {
	const [data, setData] = React.useState(initialData);
	return (
		<ThemeProvider>
			<ThemeProvider.GlobalStyle />
			<div style={{ padding: 20, width: 900 }}>
				<h1>jsonforms on top of Coral</h1>
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
