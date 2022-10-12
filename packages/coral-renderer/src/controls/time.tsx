import * as React from 'react';

import { isTimeControl, RankedTester, rankWith } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseTimeControl(props: any) {
	return (
		<Form.Time
			hasError={props.errors.length > 0}
			description={props.description}
			label={props.label}
			value={props.data}
			name={props.path}
			onChange={e => props.handleChange(e.target.value)}
			required={props.required}
		/>
	);
}

export const timeTester: RankedTester = rankWith(3, isTimeControl);

export const TimeControl = withJsonFormsControlProps(BaseTimeControl);
