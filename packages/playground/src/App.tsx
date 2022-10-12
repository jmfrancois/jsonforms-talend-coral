import './App.css';
import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { renderers, cells } from '@talend/jsonforms-coral';
import { Form, ThemeProvider, StackHorizontal } from '@talend/design-system';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';

const initialJSONSchema = {
	type: 'object',
	properties: {
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

const initialUISchema = {
	type: 'VerticalLayout',
	elements: [
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

const initialData = {};

const RENDERER: Record<string, any> = {
	vanilla: vanillaRenderers,
	coral: renderers,
};

const CELLS: Record<string, any> = {
	vanilla: vanillaCells,
	coral: cells,
};

export function App() {
	const [schema, setSchema] = React.useState(initialJSONSchema);
	const [uiSchema, setUISchema] = React.useState(initialUISchema);
	const [data, setData] = React.useState(initialData);
	const [renderer, setRenderer] = React.useState('coral');
	return (
		<ThemeProvider>
			<ThemeProvider.GlobalStyle />
			<StackHorizontal gap="S" isFullWidth>
				<div style={{ flex: 1, margin: 20 }}>
					<h2>Configure jsonform</h2>
					<Form>
						<Form.Select
							onChange={e => setRenderer(e.target.value)}
							value={renderer}
							label="Renderer"
							name="renderer"
						>
							<option>coral</option>
							<option>vanilla</option>
						</Form.Select>
						<Form.Textarea
							label="JSON Schema"
							rows={20}
							value={JSON.stringify(schema, null, 2)}
							onChange={e => {
								let value;
								try {
									value = JSON.parse(e.target.value);
									setSchema(value);
								} catch (e) {}
							}}
							name="schema"
						></Form.Textarea>
						<Form.Textarea
							label="UI Schema"
							rows={20}
							value={JSON.stringify(uiSchema, null, 2)}
							name="uischema"
							onChange={e => {
								let value;
								try {
									value = JSON.parse(e.target.value);
									setUISchema(value);
								} catch (e) {}
							}}
						></Form.Textarea>
						<Form.Textarea
							label="Data"
							rows={6}
							value={JSON.stringify(data, null, 2)}
							name="data"
							onChange={e => {
								let value;
								try {
									value = JSON.parse(e.target.value);
									setData(value);
								} catch (e) {}
							}}
						></Form.Textarea>
					</Form>
				</div>
				<div style={{ flex: 2, margin: 20 }}>
					<h2>see jsonforms using {renderer} renderer</h2>
					<form>
						<JsonForms
							schema={schema}
							uischema={uiSchema}
							data={data}
							renderers={RENDERER[renderer]}
							cells={CELLS[renderer]}
							onChange={({ data }) => setData(data)}
						/>
					</form>
				</div>
			</StackHorizontal>
		</ThemeProvider>
	);
}
