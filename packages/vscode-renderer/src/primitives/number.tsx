import * as React from 'react';

import { isNumberControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseNumberControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}
	if (props?.uischema?.options?.text) {
		return (
			<Form.Text
				hasError={props.errors.length > 0}
				description={props.description}
				disabled={!props.enabled}
				label={props.label}
				value={props.data}
				name={props.path}
				onChange={e => props.handleChange(props.path, e.target.value)}
				required={props.required}
			/>
		);
	}
	return (
		<Form.Number
			hasError={props.errors.length > 0}
			description={props.description}
			disabled={!props.enabled}
			label={props.label}
			value={props.data}
			name={props.path}
			step="0.1"
			onChange={e => props.handleChange(props.path, e.target.value)}
			required={props.required}
		/>
	);
}

export const numberTester: RankedTester = rankWith(2, isNumberControl);
export const NumberControl = withJsonFormsControlProps(BaseNumberControl);
