import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const App = () => {
	const [param, setParams] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': param.fontFamilyOption.value,
					'--font-size': param.fontSizeOption.value,
					'--font-color': param.fontColor.value,
					'--container-width': param.contentWidth.value,
					'--bg-color': param.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setParams={setParams} />
			<Article />
		</div>
	);
};
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
