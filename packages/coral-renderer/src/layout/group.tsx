import * as React from 'react';
import { Layout, RankedTester, rankWith, LayoutProps, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLayoutProps, JsonFormsDispatch, useJsonForms } from '@jsonforms/react';
import { Form } from '@talend/design-system';

function BaseGroupLayoutRenderer(props: LayoutProps) {
	const { renderers, cells } = useJsonForms();
	const uischema = props.uischema as Layout;
	return (
		<Form.Fieldset legend={props.label}>
			{uischema.elements.map((child: any, index: any) => (
				<div key={`${props.path}-${index}`}>
					<JsonFormsDispatch
						renderers={renderers}
						cells={cells}
						uischema={child}
						schema={props.schema}
						path={props.path}
						enabled={props.enabled}
					/>
				</div>
			))}
		</Form.Fieldset>
	);
}

export const GroupLayoutRenderer = withJsonFormsLayoutProps(BaseGroupLayoutRenderer);
export const groupLayoutTester: RankedTester = rankWith(1, uiTypeIs('Group'));
