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
		primitives: {
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
		},
		advanced: {
			type: 'object',
			properties: {
				gender: {
					oneOf: [
						{
							const: 'male',
							title: 'Male',
						},
						{
							const: 'female',
							title: 'Female',
						},
						{
							const: 'other',
							title: 'Diverse',
						},
					],
				},
			},
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
			type: 'Group',
			label: 'My Group aka fieldset',
			elements: [
				{
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'Control',
							scope: '#/properties/primitives/properties/boolean',
						},
						{
							type: 'Control',
							scope: '#/properties/primitives/properties/toggle',
							options: {
								toggle: true,
							},
						},
					],
				},
				{
					type: 'Control',
					scope: '#/properties/primitives/properties/string',
				},
				{
					type: 'Control',
					scope: '#/properties/primitives/properties/stringmulti',
					options: {
						multi: true,
					},
				},
				{
					type: 'Control',
					scope: '#/properties/primitives/properties/date',
				},
				{
					type: 'Control',
					scope: '#/properties/primitives/properties/time',
				},
				{
					type: 'Control',
					scope: '#/properties/primitives/properties/datetime',
				},
				{
					type: 'Control',
					scope: '#/properties/primitives/properties/integer',
				},
			],
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
	const isCoral = data.renderer === 'coral';
	return (
		<ThemeProvider>
			{data.renderer === 'coral' && <ThemeProvider.GlobalStyle />}
			<div style={{ padding: 20, width: 900 }}>
				<h1>jsonforms on top of Coral</h1>
				<form>
					<JsonForms
						schema={schema}
						uischema={uischema}
						data={data}
						renderers={RENDERER[data.renderer]}
						cells={CELLS[data.renderer]}
						onChange={({ data }) => setData(data)}
					/>
				</form>
			</div>
		</ThemeProvider>
	);
}
