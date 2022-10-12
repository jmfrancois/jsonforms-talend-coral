import * as React from 'react';

import { isDateTimeControl, RankedTester, rankWith } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseDateTimeControl(props: any) {
	return (
		<Form.DatetimeLocal
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

export const dateTimeTester: RankedTester = rankWith(3, isDateTimeControl);

export const DateTimeControl = withJsonFormsControlProps(BaseDateTimeControl);
