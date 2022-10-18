import * as React from 'react';
import { isBooleanControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { VSCodeCheckbox } from '@vscode/webview-ui-toolkit/react';

export function BaseBooleanControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}
	// if (props?.uischema?.options?.toggle) {
	// 	return (
	// 		<Form.ToggleSwitch
	// 			label={props.label}
	// 			checked={props.data}
	// 			disabled={!props.enabled}
	// 			name={props.path}
	// 			required={props.required}
	// 			onChange={e => props.handleChange(props.path, !!e.target.checked)}
	// 		/>
	// 	);
	// }
	return (
		<VSCodeCheckbox
			checked={props.data}
			name={props.path}
			disabled={!props.enabled}
			required={props.required}
			onChange={() => {
				props.handleChange(props.path, !props.data);
			}}
		>
			{props.label}
		</VSCodeCheckbox>
	);
}

export const booleanTester: RankedTester = rankWith(2, isBooleanControl);

export const BooleanControl = withJsonFormsControlProps(BaseBooleanControl);
