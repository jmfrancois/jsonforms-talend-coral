import * as React from 'react';

import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseStringControl(props: any) {
	if (props?.uischema?.options?.multi) {
		return (
			<Form.Textarea
				hasError={props.errors.length > 0}
				description={props.description}
				label={props.label}
				value={props.data}
				name={props.path}
				onChange={e => props.handleChange(props.path, e.target.value)}
				required={props.required}
			/>
		);
	}
	return (
		<Form.Text
			hasError={props.errors.length > 0}
			description={props.description}
			label={props.label}
			value={props.data}
			name={props.path}
			onChange={e => props.handleChange(props.path, e.target.value)}
			required={props.required}
		/>
	);
}

export const stringTester: RankedTester = rankWith(1, isStringControl);

export const StringControl = withJsonFormsControlProps(BaseStringControl);
