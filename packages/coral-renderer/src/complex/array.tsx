import React, { useMemo } from 'react';
import {
	isObjectArrayWithNesting,
	RankedTester,
	rankWith,
	ArrayControlProps,
	composePaths,
	createDefaultValue,
	findUISchema,
	Helpers,
	ControlElement,
} from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsArrayControlProps } from '@jsonforms/react';

export const arrayControlTester: RankedTester = rankWith(4, isObjectArrayWithNesting);

export function BaseArrayRenderer(props: ArrayControlProps) {
	const controlElement = props.uischema as ControlElement;
	const labelDescription = Helpers.createLabelDescriptionFrom(controlElement, props.schema);
	const label = labelDescription.show ? labelDescription.text : '';
	return <h1>{label}</h1>;
}

export const ArrayControl = withJsonFormsArrayControlProps(BaseArrayRenderer);
