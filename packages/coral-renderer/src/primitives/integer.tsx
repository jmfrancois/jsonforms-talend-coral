import * as React from 'react';

import { isIntegerControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';
const toNumber = (value: string) => (value === '' ? undefined : parseInt(value, 10));

export function BaseIntegerControl(props: ControlProps) {
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
			onChange={e => props.handleChange(props.path, toNumber(e.target.value))}
			required={props.required}
		/>
	);
}

export const integerTester: RankedTester = rankWith(2, isIntegerControl);
export const IntegerControl = withJsonFormsControlProps(BaseIntegerControl);
