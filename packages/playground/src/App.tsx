import './App.css';
import React from 'react';
import { JsonSchema } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { renderers, cells } from '@talend/jsonforms-coral';
import { Form, ThemeProvider, StackHorizontal, IconsProvider } from '@talend/design-system';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';
import { OpenAPI } from './OpenAPI';

const JSON_SCHEMA_KEY = 'talend-json-schema-key';
const UI_SCHEMA_KEY = 'talend-ui-schema-key';

const initialJSONSchemaStr = localStorage.getItem(JSON_SCHEMA_KEY);
let initialJSONSchema: JsonSchema | undefined;
if (initialJSONSchemaStr) {
	try {
		initialJSONSchema = JSON.parse(initialJSONSchemaStr) as JsonSchema;
	} catch (e) {
		initialJSONSchema = undefined;
	}
}

const EXAMPLES = ['basic', 'control', 'categorization', 'layout-nested', 'array', 'rule'];

initialJSONSchema = initialJSONSchema || {
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

const initialUISchemaStr = localStorage.getItem(UI_SCHEMA_KEY);
let initialUISchema: any;
if (initialUISchemaStr) {
	try {
		initialUISchema = JSON.parse(initialUISchemaStr);
	} catch (e) {
		initialUISchema = undefined;
	}
}

initialUISchema = initialUISchema || {
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
	const [uiSchemaError, setUISchemaError] = React.useState();
	const [schemaError, setSchemaError] = React.useState();
	const [schema, setSchema] = React.useState(initialJSONSchema);
	const [uiSchema, setUISchema] = React.useState(initialUISchema);
	const [data, setData] = React.useState(initialData);
	const [readOnly, setReadOnly] = React.useState(false);
	const [renderer, setRenderer] = React.useState('coral');
	return (
		<ThemeProvider>
			<ThemeProvider.GlobalStyle />
			<IconsProvider />
			<StackHorizontal gap="S" isFullWidth>
				<div style={{ flex: 1, margin: 20 }}>
					<h2>Configure jsonform</h2>
					<Form>
						<Form.ToggleSwitch
							onChange={e => setReadOnly(!readOnly)}
							checked={readOnly}
							label="Read Only"
							name="readonly"
						/>
						<Form.Select
							onChange={e => setRenderer(e.target.value)}
							value={renderer}
							label="Renderer"
							name="renderer"
						>
							<option>coral</option>
							<option>vanilla</option>
						</Form.Select>
						<Form.Select
							onChange={e => {
								const example = e.target.value;
								fetch(`${example}/schema.json`)
									.then(r => r.json())
									.then((value: any) => {
										setSchemaError(undefined);
										localStorage.setItem(JSON_SCHEMA_KEY, JSON.stringify(value, null, 2));
										setSchema(value);
									});
								fetch(`${example}/uischema.json`)
									.then(r => r.json())
									.then((value: any) => {
										setUISchemaError(undefined);
										setUISchema(value);
										localStorage.setItem(UI_SCHEMA_KEY, JSON.stringify(value, null, 2));
									});
							}}
							value={renderer}
							label="Example"
							name="example"
						>
							{EXAMPLES.map(example => (
								<option key={example}>{example}</option>
							))}
						</Form.Select>
						<Form.Textarea
							label="JSON Schema"
							rows={20}
							hasError={!!schemaError}
							description={schemaError}
							value={localStorage.getItem(JSON_SCHEMA_KEY) || ''}
							onChange={e => {
								try {
									setSchemaError(undefined);
									const value = JSON.parse(e.target.value);
									localStorage.setItem(JSON_SCHEMA_KEY, JSON.stringify(value, null, 2));
									setSchema(value);
								} catch (error: any) {
									setSchemaError(error.message);
									localStorage.setItem(JSON_SCHEMA_KEY, e.target.value);
								}
							}}
							name="schema"
						></Form.Textarea>
						<Form.Textarea
							label="UI Schema"
							rows={20}
							value={localStorage.getItem(UI_SCHEMA_KEY) || ''}
							hasError={!!uiSchemaError}
							description={uiSchemaError}
							name="uischema"
							onChange={e => {
								try {
									setUISchemaError(undefined);
									const value = JSON.parse(e.target.value);
									setUISchema(value);
									localStorage.setItem(UI_SCHEMA_KEY, JSON.stringify(value, null, 2));
								} catch (error: any) {
									setUISchemaError(error.message);
									console.error(error);
									localStorage.setItem(UI_SCHEMA_KEY, e.target.value);
								}
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
							readonly={readOnly}
						/>
					</form>
					<OpenAPI
						url="petstore.oas3.json"
						renderers={RENDERER[renderer]}
						cells={CELLS[renderer]}
					/>
				</div>
			</StackHorizontal>
		</ThemeProvider>
	);
}
