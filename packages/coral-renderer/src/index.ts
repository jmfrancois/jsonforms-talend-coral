import { RankedTester } from '@jsonforms/core';
import {
	vanillaCells,
	vanillaRenderers,
	InputControl as VanilaInput,
} from '@jsonforms/vanilla-renderers';
import { BooleanControl, booleanTester } from './controls/boolean';
import { DateControl, dateTester } from './controls/date';
import { TimeControl, timeTester } from './controls/time';
import { StringControl, stringTester } from './controls/string';
import { IntegerControl, integerTester } from './controls/integer';
import { DateTimeControl, dateTimeTester } from './controls/datetime';

export const renderers: { tester: RankedTester; renderer: any }[] = [
	...vanillaRenderers.filter(i => i.renderer !== VanilaInput),
	{ tester: stringTester, renderer: StringControl },
	{ tester: booleanTester, renderer: BooleanControl },
	{ tester: dateTester, renderer: DateControl },
	{ tester: timeTester, renderer: TimeControl },
	{ tester: dateTimeTester, renderer: DateTimeControl },
	{ tester: integerTester, renderer: IntegerControl },
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
