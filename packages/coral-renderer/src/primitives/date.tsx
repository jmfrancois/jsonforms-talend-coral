import * as React from 'react';

import { isDateControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseDateControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}
	return (
		<Form.Date
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

export const dateTester: RankedTester = rankWith(3, isDateControl);

export const DateControl = withJsonFormsControlProps(BaseDateControl);
