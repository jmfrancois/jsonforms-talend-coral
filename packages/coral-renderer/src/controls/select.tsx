import * as React from 'react';

import { isEnumControl, RankedTester, rankWith } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseSelectControl(props: any) {
	return (
		<Form.Select
			hasError={props.errors.length > 0}
			description={props.description}
			label={props.label}
			value={props.data}
			name={props.path}
			onChange={e => {
				props.handleChange(props.path, e.target.value);
			}}
			required={props.required}
		>
			{[].concat(
				props.schema.enum.map((optionValue: any) => (
					<option value={optionValue} label={optionValue} key={optionValue} />
				)),
			)}
		</Form.Select>
	);
}

export const selectTester: RankedTester = rankWith(3, isEnumControl);

export const SelectControl = withJsonFormsControlProps(BaseSelectControl);
