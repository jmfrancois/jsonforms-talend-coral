import React from 'react';
import { CellProps, isNumberControl, RankedTester, rankWith } from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { InputPrimitive } from '@talend/design-system/lib/components/Form/Primitives';

const toNumber = (value: string) => (value === '' ? undefined : Number(value));

export const BaseNumberCell = (props: CellProps) => {
	const { data, id, enabled, uischema, path, handleChange } = props;

	return (
		<InputPrimitive
			type="number"
			step="0.1"
			value={data ?? ''}
			onChange={ev => handleChange(path, toNumber(ev.target.value))}
			id={id}
			disabled={!enabled}
			autoFocus={uischema.options && uischema.options.focus}
		/>
	);
};

/**
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const numberCellTester: RankedTester = rankWith(2, isNumberControl);

export const NumberCell = withJsonFormsCellProps(BaseNumberCell);
