import * as React from 'react';
import { Layout, RankedTester, rankWith, RendererProps, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLayoutProps, JsonFormsDispatch, useJsonForms } from '@jsonforms/react';
import { StackHorizontal } from '@talend/design-system';

function BaseHorizontalLayoutRenderer(props: RendererProps) {
	const { renderers, cells } = useJsonForms();
	const uischema = props.uischema as Layout;
	return (
		<StackHorizontal gap="S" isFullWidth>
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
		</StackHorizontal>
	);
}

export const HorizontalLayoutRenderer = withJsonFormsLayoutProps(BaseHorizontalLayoutRenderer);
export const horizontalLayoutTester: RankedTester = rankWith(1, uiTypeIs('HorizontalLayout'));
