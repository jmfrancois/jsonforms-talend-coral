import { RankedTester } from '@jsonforms/core';
import { BooleanControl, booleanTester } from './primitives/boolean';
import { DateControl, dateTester } from './primitives/date';
import { TimeControl, timeTester } from './primitives/time';
import { StringControl, stringTester } from './primitives/string';
import { IntegerControl, integerTester } from './primitives/integer';
import { DateTimeControl, dateTimeTester } from './primitives/datetime';
import { SelectControl, selectTester } from './primitives/select';
import { VerticalLayoutRenderer, verticalLayoutTester } from './layout/vertical';
import { HorizontalLayoutRenderer, horizontalLayoutTester } from './layout/horizontal';
import { GroupLayoutRenderer, groupLayoutTester } from './layout/group';

export const renderers: { tester: RankedTester; renderer: any }[] = [
	{ tester: stringTester, renderer: StringControl },
	{ tester: booleanTester, renderer: BooleanControl },
	{ tester: dateTester, renderer: DateControl },
	{ tester: timeTester, renderer: TimeControl },
	{ tester: dateTimeTester, renderer: DateTimeControl },
	{ tester: integerTester, renderer: IntegerControl },
	{ tester: selectTester, renderer: SelectControl },
	{ tester: verticalLayoutTester, renderer: VerticalLayoutRenderer },
	{ tester: horizontalLayoutTester, renderer: HorizontalLayoutRenderer },
	{ tester: groupLayoutTester, renderer: GroupLayoutRenderer },
];

export const cells: { tester: RankedTester; cell: any }[] = [
	// ...vanillaCells,
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
