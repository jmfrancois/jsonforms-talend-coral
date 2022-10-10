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

export function InputControl(props: any) {
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

const isCorrectType = schemaTypeIs('string');
function isInputText(uischema: UISchemaElement, schema: JsonSchema, context: TesterContext) {
	return isControl(uischema) && isCorrectType(uischema, schema, context);
}

export const inputControlTester: RankedTester = rankWith(1, isInputText);

export default withJsonFormsControlProps(InputControl);
