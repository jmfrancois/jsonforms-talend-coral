import * as React from 'react';
import { isBooleanControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Form } from '@talend/design-system';

export function BaseBooleanControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}
	if (props?.uischema?.options?.toggle) {
		return (
			<Form.ToggleSwitch
				label={props.label}
				checked={props.data}
				disabled={!props.enabled}
				name={props.path}
				required={props.required}
				onChange={e => props.handleChange(props.path, e.target.value)}
			/>
		);
	}
	return (
		<Form.Checkbox
			label={props.label}
			checked={props.data}
			name={props.path}
			disabled={!props.enabled}
			required={props.required}
			onChange={e => props.handleChange(props.path, e.target.value)}
		/>
	);
}

export const booleanTester: RankedTester = rankWith(2, isBooleanControl);

export const BooleanControl = withJsonFormsControlProps(BaseBooleanControl);
