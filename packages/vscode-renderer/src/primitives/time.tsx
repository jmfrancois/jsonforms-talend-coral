import * as React from 'react';

import { isTimeControl, RankedTester, rankWith, ControlProps } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseTimeControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}
	return (
		<Form.Time
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

export const timeTester: RankedTester = rankWith(3, isTimeControl);

export const TimeControl = withJsonFormsControlProps(BaseTimeControl);
