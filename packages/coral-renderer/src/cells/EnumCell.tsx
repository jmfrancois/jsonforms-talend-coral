import React, { useMemo } from 'react';
import { EnumCellProps, isEnumControl, RankedTester, rankWith } from '@jsonforms/core';
import { TranslateProps, withJsonFormsEnumCellProps, withTranslateProps } from '@jsonforms/react';
import { SelectPrimitive } from '@talend/design-system/lib/components/Form/Primitives';

const i18nDefaults = {
	'enum.none': 'None',
};

export const BaseEnumCell = (props: EnumCellProps & TranslateProps) => {
	const { data, id, enabled, schema, uischema, path, handleChange, options, t } = props;
	const noneOptionLabel = useMemo(
		() => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }),
		[t, schema, uischema, path],
	);
	return (
		<SelectPrimitive
			id={id}
			disabled={!enabled}
			autoFocus={uischema.options && uischema.options.focus}
			value={data || ''}
			onChange={ev =>
				handleChange(path, ev.target.selectedIndex === 0 ? undefined : ev.target.value)
			}
		>
			{[
				<option value={''} key={'jsonforms.enum.none'}>
					{noneOptionLabel}
				</option>,
			].concat(
				(options || []).map(optionValue => (
					<option value={optionValue.value} label={optionValue.label} key={optionValue.value} />
				)),
			)}
		</SelectPrimitive>
	);
};
/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const enumCellTester: RankedTester = rankWith(2, isEnumControl);

export const EnumCell = withJsonFormsEnumCellProps(withTranslateProps(BaseEnumCell));
