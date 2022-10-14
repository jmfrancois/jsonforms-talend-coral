import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { CollapsiblePanel } from '@talend/design-system';

interface OpenAPIProps {
	url: string;
	renderers: any;
	cells: any;
}

function getComponents(data: any) {
	if (!data) {
		return [];
	}
	return Object.keys(data.components.schemas).map(schemaKey => {
		return {
			schema: { ...data.components.schemas[schemaKey], components: data.components },
			uischema: {},
			data: {},
			key: schemaKey,
		};
	});
}

export function OpenAPI(props: OpenAPIProps) {
	const [data, setData] = React.useState<any>();
	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		fetch(props.url, { signal })
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				} else {
					throw new Error('OpenAPI response is not OK');
				}
			})
			.catch(e => {
				setData(e);
			})
			.then(resp => {
				setData(resp);
			});
	}, [props.url]);
	if (data instanceof Error) {
		return <p>There is an error with {props.url}</p>;
	}
	return (
		<>
			<h1>Hello OpenAPI</h1>
			<p>
				THe following form are taken from definition found in OAS3 file{' '}
				<a href="petstore.oas3.json">petstore.oas3.json</a>
			</p>
			{getComponents(data).map((component: any) => (
				<CollapsiblePanel title={component.key}>
					<React.Suspense key={component.key} fallback={<p>An error occurs</p>}>
						<h3>{component.key} Form</h3>
						<JsonForms
							schema={component.schema}
							uischema={component.uiSchema}
							data={component.data}
							renderers={props.renderers}
							cells={props.cells}
							onChange={({ data }) => console.log(data)}
						/>
					</React.Suspense>
				</CollapsiblePanel>
			))}
		</>
	);
}
