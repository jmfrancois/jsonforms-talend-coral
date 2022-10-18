import * as React from 'react';
import { Layout, RankedTester, rankWith, RendererProps, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLayoutProps, JsonFormsDispatch, useJsonForms } from '@jsonforms/react';
import { StackVertical } from '@talend/design-system';

function BaseVerticalLayoutRenderer(props: RendererProps) {
	const uischema = props.uischema as Layout;
	const { renderers, cells } = useJsonForms();
	return (
		<StackVertical gap="S" align="stretch">
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
		</StackVertical>
	);
}

export const VerticalLayoutRenderer = withJsonFormsLayoutProps(BaseVerticalLayoutRenderer);
export const verticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));
