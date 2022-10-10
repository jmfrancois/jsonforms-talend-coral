import { RankedTester } from '@jsonforms/core';
import {
	vanillaCells,
	vanillaRenderers,
	InputControl as VanilaInput,
} from '@jsonforms/vanilla-renderers';
import ChecboxControl, { checkboxTester } from './controls/checkbox';

import InputControl, { inputControlTester } from './controls/input';

export const renderers: { tester: RankedTester; renderer: any }[] = [
	...vanillaRenderers.filter(i => i.renderer !== VanilaInput),
	{ tester: inputControlTester, renderer: InputControl },
	{ tester: checkboxTester, renderer: ChecboxControl },
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
