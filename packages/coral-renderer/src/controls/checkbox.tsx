import * as React from 'react';

import {
	computeLabel,
	ControlProps,
	ControlState,
	isControl,
	schemaTypeIs,
	isDescriptionHidden,
	TesterContext,
	JsonSchema,
	schemaMatches,
	UISchemaElement,
	NOT_APPLICABLE,
	RankedTester,
	rankWith,
} from '@jsonforms/core';
import { Form } from '@talend/design-system';
import { Control, DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';

export function ChecboxControl(props: any) {
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
	return (
		<Form.Checkbox label={label} checked={props.data} name="company" required={props.required} />
	);
}

const isCorrectType = schemaTypeIs('boolean');
function isCheckbox(uischema: UISchemaElement, schema: JsonSchema, context: TesterContext) {
	console.log(isControl(uischema), isCorrectType(uischema, schema, context));
	return isControl(uischema) && isCorrectType(uischema, schema, context);
}

export const checkboxTester: RankedTester = rankWith(1, isCheckbox);

export default withJsonFormsControlProps(ChecboxControl);
