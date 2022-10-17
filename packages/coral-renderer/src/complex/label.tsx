import React from 'react';
import { LabelProps, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLabelProps } from '@jsonforms/react';

export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs('Label'));

/**
 * Default renderer for a label.
 */
export function LabelRenderer(props: LabelProps) {
	return <label>{props.uischema.text}</label>;
}

export default withJsonFormsLabelProps(LabelRenderer);
