import './App.css';
import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { renderers, cells } from '@talend/jsonforms-coral';
import { Form, ThemeProvider } from '@talend/design-system';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';

const schema = {
	type: 'object',
	properties: {
		renderer: {
			type: 'string',
			enum: ['coral', 'vanilla'],
		},
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
		toggle: {
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
			scope: '#/properties/renderer',
		},
		{
			type: 'Control',
			scope: '#/properties/boolean',
		},
		{
			type: 'Control',
			scope: '#/properties/toggle',
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

const initialData = {
	renderer: 'coral',
};

const RENDERER: Record<string, any> = {
	vanilla: vanillaRenderers,
	coral: renderers,
};

const CELLS: Record<string, any> = {
	vanilla: vanillaCells,
	coral: cells,
};

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
						renderers={RENDERER[data.renderer]}
						cells={CELLS[data.renderer]}
						onChange={({ data }) => setData(data)}
					/>
				</Form>
			</div>
		</ThemeProvider>
	);
}
