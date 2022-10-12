import * as React from 'react';
import { RankedTester, rankWith, RendererProps, uiTypeIs, HorizontalLayout } from '@jsonforms/core';
import { withJsonFormsLayoutProps, JsonFormsDispatch, useJsonForms } from '@jsonforms/react';
import { StackHorizontal } from '@talend/design-system';

function BaseHorizontalLayoutRenderer(props: any) {
	console.log(props);
	const { renderers, cells } = useJsonForms();
	return (
		<StackHorizontal gap="S" isFullWidth>
			{props.uischema.elements.map((child: any, index: any) => (
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
