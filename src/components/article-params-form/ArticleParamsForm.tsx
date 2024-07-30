import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import clsx from 'clsx';

interface IArticleParamsForm {
	setParams: (value: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: IArticleParamsForm) => {
	const { setParams } = props;
	const [state, setState] = useState(false);
	const [currentValue, setCurrentValue] = useState(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleArticleStateChange = (param: string) => {
		return (value: OptionType) => {
			setCurrentValue((prev) => ({
				...prev,
				[param]: value,
			}));
		};
	};

	const handleSubmitChange = (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		setParams(currentValue);
	};

	const handleResetChange = () => {
		setCurrentValue(defaultArticleState);
		setParams(defaultArticleState);
	};

	const handleMouseCLickClose = (event: Event) => {
		const { target } = event;
		if (target instanceof Node && !rootRef.current?.contains(target)) {
			setState(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleMouseCLickClose);

		return () => {
			document.removeEventListener('mousedown', handleMouseCLickClose);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={state} onClick={() => setState((prev) => !prev)} />
			<aside
				ref={rootRef}
				onReset={handleResetChange}
				onSubmit={handleSubmitChange}
				className={clsx(styles.container, state && styles.container_open)}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div>
						<Text size={12} weight={800} uppercase>
							Шрифт
						</Text>
						<Select
							selected={currentValue.fontFamilyOption}
							onChange={handleArticleStateChange('fontFamilyOption')}
							options={[...fontFamilyOptions]}></Select>
					</div>
					<div>
						<Text size={12} weight={800} uppercase>
							Размер шрифта
						</Text>
						<RadioGroup
							name={`${currentValue.fontSizeOption}`}
							options={[...fontSizeOptions]}
							selected={currentValue.fontSizeOption}
							onChange={handleArticleStateChange('fontSizeOption')}
							title={''}></RadioGroup>
					</div>
					<div>
						<Text size={12} weight={800} uppercase>
							Цвет шрифта
						</Text>
						<Select
							selected={currentValue.fontColor}
							onChange={handleArticleStateChange('fontColor')}
							options={[...fontColors]}></Select>
					</div>
					<Separator></Separator>
					<div>
						<Text size={12} weight={800} uppercase>
							Цвет фона
						</Text>
						<Select
							selected={currentValue.backgroundColor}
							onChange={handleArticleStateChange('backgroundColor')}
							options={[...backgroundColors]}></Select>
					</div>
					<div>
						<Text size={12} weight={800} uppercase>
							Ширина контента
						</Text>
						<Select
							selected={currentValue.contentWidth}
							onChange={handleArticleStateChange('contentWidth')}
							options={[...contentWidthArr]}></Select>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
