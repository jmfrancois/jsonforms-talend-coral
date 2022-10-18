import * as React from 'react';

import { isStringControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { VSCodeTextField, VSCodeTextArea } from '@vscode/webview-ui-toolkit/react';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseStringControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}
	//https://github.com/microsoft/vscode-webview-ui-toolkit/blob/main/src/text-field/README.md
	if (props?.uischema?.options?.multi) {
		return (
			<VSCodeTextArea
				disabled={!props.enabled}
				value={props.data || ''}
				name={props.path}
				// onChange={e => props.handleChange(props.path, e.target?.value)}
				required={props.required}
			>
				{props.label}
			</VSCodeTextArea>
		);
	}
	return (
		<VSCodeTextField
			value={props.data || ''}
			name={props.path}
			disabled={!props.enabled}
			// onChange={e => props.handleChange(props.path, e.target?.value)}
			required={props.required}
		>
			{props.label}
		</VSCodeTextField>
	);
}

export const stringTester: RankedTester = rankWith(1, isStringControl);

export const StringControl = withJsonFormsControlProps(BaseStringControl);
