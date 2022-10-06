import * as React from 'react';

import {
	computeLabel,
	ControlProps,
	ControlState,
	isControl,
	isDescriptionHidden,
	NOT_APPLICABLE,
	RankedTester,
	rankWith,
} from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { Control, DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';

export function InputControl(props: any) {
	console.log('InputControl', props);
	const {
		description,
		id,
		errors,
		label,
		uischema,
		schema,
		rootSchema,
		visible,
		enabled,
		required,
		path,
		cells,
		config,
	} = props;
	const isValid = errors.length === 0;
	const appliedUiSchemaOptions = { ...config, ...uischema.options };
	const showDescription = !isDescriptionHidden(
		visible,
		description,
		false, //this.state.isFocused,
		appliedUiSchemaOptions.showUnfocusedDescription,
	);
	const testerContext = {
		rootSchema: rootSchema,
		config: config,
	};
	return <Form.Text label={label} value={props.data} name="company" required={props.required} />;
}

export const inputControlTester: RankedTester = rankWith(1, isControl);

export default withJsonFormsControlProps(InputControl);
