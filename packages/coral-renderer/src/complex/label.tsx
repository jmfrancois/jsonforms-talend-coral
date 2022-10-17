import React from 'react';
import { LabelProps, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLabelProps } from '@jsonforms/react';

export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs('Label'));

/**
 * Default renderer for a label.
 */
export function BaseLabelRenderer(props: LabelProps) {
	return <label>{props.text}</label>;
}

export const LabelRenderer = withJsonFormsLabelProps(BaseLabelRenderer);
