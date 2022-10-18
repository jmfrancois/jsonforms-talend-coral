import * as React from 'react';

import { isEnumControl, RankedTester, rankWith, ControlProps, EnumOption } from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { withJsonFormsControlProps } from '@jsonforms/react';

export function BaseSelectControl(props: ControlProps) {
	if (!props.visible) {
		return null;
	}

	const options: EnumOption[] = props?.schema?.enum || [];
	return (
		<Form.Select
			hasError={props.errors.length > 0}
			description={props.description}
			disabled={!props.enabled}
			label={props.label}
			value={props.data}
			name={props.path}
			onChange={e => {
				props.handleChange(props.path, e.target.value);
			}}
			required={props.required}
		>
			{options.map((optionValue: any) => (
				<option value={optionValue} label={optionValue} key={optionValue} />
			))}
		</Form.Select>
	);
}

export const selectTester: RankedTester = rankWith(3, isEnumControl);

export const SelectControl = withJsonFormsControlProps(BaseSelectControl);
