import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Container = styled.div`
	* {
		box-sizing: border-box;
	}

	display: inline-block;
	padding-top: 20px;

	position: relative;
`;

const Input = styled.input`
	height: 34px;
	width: ${({ width }) => getComputedStyleAttributeValue(width, 'auto')};
	padding: ${({ variant }) => (variant === 'boxed' ? '8px' : '0')};

	outline: 0;

	${({ variant }) =>
		variant === 'boxed'
			? `
					border: 1px solid #c2c2c2;

					:hover,
					:focus {
						border-color: #a2a8af;
					}
				`
			: `
					border-width: 0;
					border-bottom: 1px solid #e2e2e2;
				`}

	font-size: 14px;

	:disabled {
		background-color: rgba(216, 216, 216, 0.2);
		border-width: 0px;
	}
`;

const Label = styled.label`
	position: absolute;
	bottom: ${({ variant }) => (variant === 'boxed' ? '13px' : '10px')};
	left: 0;

	font-size: 12px;
	font-weight: bold;
	color: ${({ isActive, variant, disabled }) =>
		isActive || (variant === 'boxed' && !disabled) ? '#9f9396' : '#d3d3d3'};

	transform: translateY(
		${({ isActive, variant }) =>
			isActive || variant === 'boxed' ? '-24px' : '0px'}
	);
	transition: transform 0.15s ease 0s;
	cursor: text;

	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};

	${Input}:focus + & {
		color: #9f9396;

		transform: translateY(-24px);
	}
`;

const WarningMessage = styled.span`
	color: #ec530a;
`;

class TextField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: props.input || ''
		};

		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.labelClickHandler = this.labelClickHandler.bind(this);
	}

	inputChangeHandler(event) {
		this.setState({
			inputValue: event.target.value
		});

		const { onChange: receivedOnChange } = this.props;

		if (receivedOnChange) {
			receivedOnChange(event);
		}
	}

	labelClickHandler(event) {
		event.currentTarget.previousSibling.focus();
	}

	render() {
		const {
			width,
			label,
			warning,
			disabled: isDisabled,
			variant,
			...otherProps
		} = this.props;
		const { inputValue } = this.state;

		const disabled = isDisabled ? { disabled: true } : {};

		return (
			<Container>
				<Input
					{...disabled}
					width={width}
					{...otherProps}
					variant={variant}
					value={inputValue}
					onChange={this.inputChangeHandler}
				/>

				<Label
					variant={variant}
					onClick={this.labelClickHandler}
					isActive={inputValue !== ''}
					{...disabled}
				>
					{label}
					{warning ? <WarningMessage> ({warning})</WarningMessage> : null}
				</Label>
			</Container>
		);
	}
}

export default TextField;
