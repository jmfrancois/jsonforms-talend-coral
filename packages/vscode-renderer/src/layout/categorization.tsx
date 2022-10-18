import React from 'react';
import {
	and,
	Categorization,
	Category,
	deriveLabelForUISchemaElement,
	RankedTester,
	rankWith,
	uiTypeIs,
	LayoutProps,
	Layout,
} from '@jsonforms/core';
import {
	useJsonForms,
	JsonFormsDispatch,
	TranslateProps,
	withJsonFormsLayoutProps,
	withTranslateProps,
} from '@jsonforms/react';
import { Tabs } from '@talend/design-system';
export interface CategorizationState {
	selectedCategory: Category;
}

export const isCategorization = (category: Category | Categorization): category is Categorization =>
	category.type === 'Categorization';

export const categorizationTester: RankedTester = rankWith(
	1,
	and(uiTypeIs('Categorization'), uischema => {
		const hasCategory = (element: Categorization): boolean => {
			// if (isEmpty(element.elements)) {
			// 	return false;
			// }

			return element.elements
				.map(elem => (isCategorization(elem) ? hasCategory(elem) : elem.type === 'Category'))
				.reduce((prev, curr) => prev && curr, true);
		};

		return hasCategory(uischema as Categorization);
	}),
);

function BaseCategory(props: any) {
	const uischema = props.uischema as Layout;
	const elements = uischema.elements || [];
	return (
		<>
			{elements.map((child: any) => (
				<JsonFormsDispatch {...props} uischema={child} />
			))}
		</>
	);
}

const CategoryRenderer = withJsonFormsLayoutProps(BaseCategory);

function BaseCategorizationRenderer(props: LayoutProps & TranslateProps) {
	const { uischema, t } = props;
	const categorization = uischema as Categorization;

	const { renderers, cells } = useJsonForms();
	const categoryLabels = React.useMemo(
		() => categorization.elements.map(cat => deriveLabelForUISchemaElement(cat, t)),
		[categorization, t],
	);
	if (!props.visible) {
		return null;
	}
	// TODO: this one is quite hard, as I do not have tabs + tab component
	// we need to create elements and analyze the uischema using jsonforms/core
	const tabs = categorization.elements.map((child: any, index: any) => ({
		tabTitle: categoryLabels[index] || 'coucou',
		// type: 'button',
		tabContent: (
			<CategoryRenderer
				renderers={renderers}
				cells={cells}
				uischema={child}
				schema={props.schema}
				path={props.path}
				enabled={props.enabled}
			/>
		),
	}));
	return <Tabs size="L" tabs={tabs} />;
}

export const CategorizationRenderer = withTranslateProps(
	withJsonFormsLayoutProps(BaseCategorizationRenderer),
);
