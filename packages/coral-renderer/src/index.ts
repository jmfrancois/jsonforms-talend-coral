import { RankedTester } from '@jsonforms/core';
import {
	vanillaCells,
	vanillaRenderers,
	InputControl as VanilaInput,
} from '@jsonforms/vanilla-renderers';

import InputControl, { inputControlTester } from './controls/input';

export const renderers: { tester: RankedTester; renderer: any }[] = [
	...vanillaRenderers.filter(i => i.renderer !== VanilaInput),
	{ tester: inputControlTester, renderer: InputControl },
	// { tester: radioGroupControlTester, renderer: RadioGroupControl },
	// { tester: oneOfRadioGroupControlTester, renderer: OneOfRadioGroupControl },
	// { tester: arrayControlTester, renderer: ArrayControl },
	// { tester: labelRendererTester, renderer: LabelRenderer },
	// { tester: categorizationTester, renderer: Categorization },
	// { tester: tableArrayControlTester, renderer: TableArrayControl },
	// { tester: groupTester, renderer: GroupLayout },
	// { tester: verticalLayoutTester, renderer: VerticalLayout },
	// { tester: horizontalLayoutTester, renderer: HorizontalLayout }
];

export const cells: { tester: RankedTester; cell: any }[] = [
	...vanillaCells,
	// { tester: booleanCellTester, cell: BooleanCell },
	// { tester: dateCellTester, cell: DateCell },
	// { tester: dateTimeCellTester, cell: DateTimeCell },
	// { tester: enumCellTester, cell: EnumCell },
	// { tester: integerCellTester, cell: IntegerCell },
	// { tester: numberCellTester, cell: NumberCell },
	// { tester: sliderCellTester, cell: SliderCell },
	// { tester: textAreaCellTester, cell: TextAreaCell },
	// { tester: textCellTester, cell: TextCell },
	// { tester: timeCellTester, cell: TimeCell }
];
