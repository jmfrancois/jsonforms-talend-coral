import * as React from 'react';

import { isIntegerControl, RankedTester, rankWith } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseIntegerControl(props: any) {
	if (props?.uischema?.options?.text) {
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
	return (
		<Form.Number
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

export const integerTester: RankedTester = rankWith(2, isIntegerControl);
export const IntegerControl = withJsonFormsControlProps(BaseIntegerControl);
