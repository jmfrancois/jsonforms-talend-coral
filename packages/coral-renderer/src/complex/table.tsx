import React, { useMemo } from 'react';
import fpfilter from 'lodash/fp/filter';
import fpmap from 'lodash/fp/map';
import fpflow from 'lodash/fp/flow';
import filter from 'lodash/filter';
import join from 'lodash/join';
import fpkeys from 'lodash/fp/keys';
import fpstartCase from 'lodash/fp/startCase';

import {
	or,
	encode,
	isPrimitiveArrayControl,
	isObjectArrayControl,
	RankedTester,
	Resolve,
	rankWith,
	ArrayControlProps,
	Helpers,
	getControlPath,
	Paths,
	createDefaultValue,
	ControlElement,
} from '@jsonforms/core';
import { DispatchCell, JsonFormsDispatch, withJsonFormsArrayControlProps } from '@jsonforms/react';
import { ButtonTertiary } from '@talend/design-system';

export function BaseTableArrayControl(props: ArrayControlProps) {
	console.log('## coucou', props);
	const controlElement = props.uischema as ControlElement;
	const schema = props.schema;
	const data = props.data;
	const properties = props.schema.properties;
	const createControlElement = (key?: string): ControlElement => ({
		type: 'Control',
		label: false,
		scope: schema.type === 'object' ? `#/properties/${key}` : '#',
	});
	const confirmDelete = (path: string, index: number) => {
		const p = path.substring(0, path.lastIndexOf('.'));
		if (props.removeItems) {
			props.removeItems(p, [index])();
		}
	};
	return (
		<div>
			<header>
				<label>{props.label}</label>
				<ButtonTertiary
					onClick={props.addItem(props.path, createDefaultValue(props.schema))}
					type="button"
					icon="plus"
					size="S"
				>
					Add
				</ButtonTertiary>
			</header>
			<table>
				<thead>
					<tr>
						{properties ? (
							fpflow(
								fpkeys,
								fpfilter(prop => properties[prop].type !== 'array'),
								fpmap(prop => <th key={prop}>{properties[prop].title ?? fpstartCase(prop)}</th>),
							)(properties)
						) : (
							<th>Items</th>
						)}
						<th>Valid</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{!data || !Array.isArray(data) || data.length === 0 ? (
						<tr>
							<td>No data</td>
						</tr>
					) : (
						data.map((_child, index) => {
							const childPath = Paths.compose(props.path, `${index}`);
							// TODO
							const errorsPerEntry: any[] = filter(props.childErrors, error => {
								const errorPath = getControlPath(error);
								return errorPath.startsWith(childPath);
							});

							return (
								<tr key={childPath}>
									{properties ? (
										fpflow(
											fpkeys,
											fpfilter(prop => properties[prop].type !== 'array'),
											fpmap(prop => {
												const childPropPath = Paths.compose(childPath, prop.toString());
												return (
													<td key={childPropPath}>
														<DispatchCell
															schema={Resolve.schema(
																schema,
																`#/properties/${encode(prop)}`,
																props.rootSchema,
															)}
															uischema={createControlElement(encode(prop))}
															path={childPath + '.' + prop}
														/>
													</td>
												);
											}),
										)(schema.properties)
									) : (
										<td key={Paths.compose(childPath, index.toString())}>
											<DispatchCell
												schema={schema}
												uischema={createControlElement()}
												path={childPath}
											/>
										</td>
									)}
									<td>
										{errorsPerEntry ? (
											<span>
												{join(
													errorsPerEntry.map(e => e.message),
													' and ',
												)}
											</span>
										) : (
											<span>OK</span>
										)}
									</td>
									<td>
										<button
											aria-label={`Delete`}
											onClick={() => {
												if (window.confirm('Are you sure you wish to delete this item?')) {
													confirmDelete(childPath, index);
												}
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}

export const tableArrayControlTester: RankedTester = rankWith(
	3,
	or(isObjectArrayControl, isPrimitiveArrayControl),
);

export const TableArrayControl = withJsonFormsArrayControlProps(BaseTableArrayControl);
