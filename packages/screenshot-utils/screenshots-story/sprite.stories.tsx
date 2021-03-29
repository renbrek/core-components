import React, { CSSProperties } from 'react';
import { combosToProps, generateCombos } from '../utils';
import { getComponent } from './components';
import { getQueryParam } from './utils';

import styles from './sprite.stories.module.css';

const propsToTitle = props => {
    const { children, ...restProps } = props;
    return JSON.stringify(restProps).replace(/[{}"]/g, '');
};

export const ScreenshotsSprite = () => {
    const knobs = getQueryParam('knobs') ? JSON.parse(getQueryParam('knobs')) : {};

    const combos = generateCombos(Object.values(knobs).map(v => (Array.isArray(v) ? v : [v])));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ids = combos.map(combo => combo.map(([_, valueIndex]) => valueIndex).join('-'));

    const propsList = combosToProps(combos, Object.keys(knobs));

    const packageName = getQueryParam('package');
    const componentName = getQueryParam('component');
    const Component = getComponent(packageName, componentName);

    const componentStyles: CSSProperties = {};
    componentStyles.width = +getQueryParam('width') || undefined;
    componentStyles.height = +getQueryParam('height') || undefined;

    if (!Component) return null;

    return (
        <div className={styles.container}>
            {propsList.map((props, index) => (
                <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className={styles.item}
                >
                    <span className={styles.title}>{propsToTitle(props)}</span>

                    <div id={ids[index]} style={componentStyles}>
                        <Component {...props} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default {
    title: 'Компоненты',
};
