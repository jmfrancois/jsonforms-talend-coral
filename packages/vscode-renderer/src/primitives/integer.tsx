import * as React from 'react';

import { isIntegerControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import { withJsonFormsControlProps } from '@jsonforms/react';

const toNumber = (value: string) => (value === '' ? undefined : parseInt(value, 10));

export function BaseIntegerControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}
	if (props?.uischema?.options?.text) {
		return (
			<VSCodeTextField
				disabled={!props.enabled}
				value={props.data}
				name={props.path}
				onChange={e => props.handleChange(props.path, e.target.value)}
				required={props.required}
			>
				{props.label}
			</VSCodeTextField>
		);
	}
	return (
		<VSCodeTextField
			type="number"
			disabled={!props.enabled}
			label={props.label}
			value={props.data}
			name={props.path}
			onChange={e => props.handleChange(props.path, toNumber(e.target.value))}
			required={props.required}
		>
			{props.label}
		</VSCodeTextField>
	);
}

export const integerTester: RankedTester = rankWith(2, isIntegerControl);
export const IntegerControl = withJsonFormsControlProps(BaseIntegerControl);
