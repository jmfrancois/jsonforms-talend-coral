import React from 'react';
import { CellProps, isStringControl, RankedTester, rankWith } from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import merge from 'lodash/merge';
import { InputPrimitive } from '@talend/design-system/lib/components/Form/Primitives';

export const BaseTextCell = (props: CellProps) => {
	const { config, data, id, enabled, uischema, schema, path, handleChange } = props;
	const maxLength = schema.maxLength;
	const appliedUiSchemaOptions = merge({}, config, uischema.options);
	return (
		<InputPrimitive
			type="text"
			value={data || ''}
			onChange={ev => handleChange(path, ev.target.value === '' ? undefined : ev.target.value)}
			id={id}
			disabled={!enabled}
			autoFocus={appliedUiSchemaOptions.focus}
			placeholder={appliedUiSchemaOptions.placeholder}
			maxLength={appliedUiSchemaOptions.restrict ? maxLength : undefined}
			size={appliedUiSchemaOptions.trim ? maxLength : undefined}
		/>
	);
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const textCellTester: RankedTester = rankWith(1, isStringControl);

export const TextCell = withJsonFormsCellProps(BaseTextCell);
