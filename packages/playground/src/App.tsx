import './App.css';
import React from 'react';
import { JsonSchema } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { renderers, cells } from '@talend/jsonforms-coral';
import { renderers as vscodeRenderers, cells as vscodeCells } from '@talend/jsonforms-vscode';
import {
	Form,
	ThemeProvider,
	StackHorizontal,
	IconsProvider,
	ButtonPrimary,
} from '@talend/design-system';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';
import { OpenAPI } from './OpenAPI';

const JSON_SCHEMA_KEY = 'talend-json-schema-key';
const UI_SCHEMA_KEY = 'talend-ui-schema-key';
const SOURCE_KEY = 'talend-source-key';

let initialSource = localStorage.getItem(SOURCE_KEY) || 'basic';
const initialJSONSchemaStr = localStorage.getItem(JSON_SCHEMA_KEY);
let initialJSONSchema: JsonSchema | undefined;
if (initialJSONSchemaStr) {
	try {
		initialJSONSchema = JSON.parse(initialJSONSchemaStr) as JsonSchema;
		initialSource = 'custom';
	} catch (e) {}
}

const EXAMPLES = [
	'basic',
	'custom',
	'control',
	'categorization',
	'layout-nested',
	'array',
	'rule',
	'openapi',
];

const initialUISchemaStr = localStorage.getItem(UI_SCHEMA_KEY);
let initialUISchema: any;
if (initialUISchemaStr) {
	try {
		initialUISchema = JSON.parse(initialUISchemaStr);
	} catch (e) {}
}

const initialData = {};

const RENDERER: Record<string, any> = {
	vanilla: vanillaRenderers,
	coral: renderers,
	vscode: vscodeRenderers,
};

const CELLS: Record<string, any> = {
	vanilla: vanillaCells,
	coral: cells,
	vscode: vscodeCells,
};

const defaultSchemaDesc = 'Write or copy paste a schema to try it';

export function App() {
	const base = process.env.PUBLIC_URL;
	const [source, setSource] = React.useState(initialSource);
	const [uiSchemaError, setUISchemaError] = React.useState();
	const [schemaError, setSchemaError] = React.useState();
	const [schema, setSchema] = React.useState(initialJSONSchema);
	const [uiSchema, setUISchema] = React.useState(initialUISchema);
	const [data, setData] = React.useState(initialData);
	const [readOnly, setReadOnly] = React.useState(false);
	const [renderer, setRenderer] = React.useState('coral');
	function loadSchema(example: string) {
		if (!example) {
			return;
		}
		if (example === 'custom') {
			try {
				setSchema(JSON.parse(localStorage.getItem(JSON_SCHEMA_KEY) || ''));
				setUISchema(JSON.parse(localStorage.getItem(UI_SCHEMA_KEY) || ''));
			} catch (e) {}
		} else if (example === 'openapi') {
		} else {
			fetch(`${base}/${example}/schema.json`)
				.then(r => r.json())
				.then((value: any) => {
					setSchema(value);
				})
				.catch(e => {
					console.log(e);
				});
			fetch(`${base}/${example}/uischema.json`)
				.then(r => r.json())
				.then((value: any) => {
					setUISchema(value);
				})
				.catch(e => {
					console.log(e);
				});
		}
	}
	React.useEffect(() => {
		loadSchema(initialSource);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
							<option>vscode</option>
							<option>vanilla</option>
						</Form.Select>
						<Form.Select
							value={source}
							onChange={e => {
								const example = e.target.value;
								setSource(example);
								console.log('###');
								loadSchema(example);
							}}
							label="Example"
							name="example"
						>
							{EXAMPLES.map(example => (
								<option key={example}>{example}</option>
							))}
						</Form.Select>
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
						{source === 'custom' && (
							<>
								<Form.Textarea
									label="JSON Schema"
									rows={20}
									hasError={!!schemaError}
									description={schemaError || defaultSchemaDesc}
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
										localStorage.setItem(UI_SCHEMA_KEY, e.target.value);
										try {
											setUISchemaError(undefined);
											const value = JSON.parse(e.target.value);
											setUISchema(value);
											localStorage.setItem(UI_SCHEMA_KEY, JSON.stringify(value, null, 2));
										} catch (error: any) {
											setUISchemaError(error.message);
											console.error(error);
										}
									}}
								></Form.Textarea>
							</>
						)}
						{source !== 'custom' && source !== 'openapi' && (
							<>
								<ButtonPrimary
									onClick={() => {
										localStorage.setItem(JSON_SCHEMA_KEY, JSON.stringify(schema, null, 2));
										localStorage.setItem(UI_SCHEMA_KEY, JSON.stringify(uiSchema, null, 2));
										setSource('custom');
									}}
								>
									Customize
								</ButtonPrimary>
								<pre>{JSON.stringify(schema, null, 2)}</pre>
								<pre>{JSON.stringify(uiSchema, null, 2)}</pre>
							</>
						)}
					</Form>
				</div>
				<div style={{ flex: 2, margin: 20 }}>
					<h2>see jsonforms using {renderer} renderer</h2>
					{source === 'openapi' ? (
						<OpenAPI
							url={`${base}/petstore.oas3.json`}
							renderers={RENDERER[renderer]}
							cells={CELLS[renderer]}
						/>
					) : (
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
					)}
				</div>
			</StackHorizontal>
		</ThemeProvider>
	);
}
