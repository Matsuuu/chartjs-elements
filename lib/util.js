import { ChartDataElement } from './ChartDataElement.js';

// Types where to prioritize dataIndex over datasetIndex
const ACTIVE_INDEX_DATAINDEX_TYPES = ['pie', 'doughnut', 'polarArea'];

export const COLORS = [
    '#f94144',
    '#f3722c',
    '#f8961e',
    '#f9844a',
    '#f9c74f',
    '#90be6d',
    '#43aa8b',
    '#4d908e',
    '#577590',
    '#277da1',
    '#ef8250',
    '#e4604e',
    '#d43d51',
];

/**
 * @param {number} index
 */
export function chartColor(index, addOpacity = true) {
    return COLORS[index % COLORS.length] + (addOpacity ? '88' : '');
}

/**
 * @param {any} el
 * @returns {el is import("./data-elements/ChartJsData.js").ChartJsData}
 */
export function isDataElement(el) {
    return el.nodeName === 'CHART-JS-DATA';
}

/**
 * @param {any} el
 * @returns {el is import("./data-elements/ChartJsDataset.js").ChartJsDataset}
 */
export function isDatasetElement(el) {
    return el.nodeName === 'CHART-JS-DATASET';
}

/**
 * @param {any} el
 * @return {el is import("./data-elements/ChartJsLegend.js").ChartJsLegend}
 * */
export function isLegendElement(el) {
    return el.nodeName === 'CHART-JS-LEGEND';
}

/**
 * @param {any} el
 * @return {el is import("./data-elements/ChartJsTitle.js").ChartJsTitle}
 * */
export function isTitleElement(el) {
    return el.nodeName === 'CHART-JS-TITLE' && !el.hasAttribute('subtitle');
}

/**
 * @param {any} el
 * @return {el is import("./data-elements/ChartJsTitle.js").ChartJsTitle}
 * */
export function isSubtitleElement(el) {
    return el.nodeName === 'CHART-JS-TITLE' && el.hasAttribute('subtitle');
}

/**
 * @param {any} el
 * @return {el is import("./data-elements/ChartJsScale.js").ChartJsScale}
 * */
export function isScaleElement(el) {
    return el.nodeName === 'CHART-JS-SCALE';
}

/**
 * @param {string} type
 * @param {boolean} multiDataset
 * @param {number} datasetIndex
 * @param {number} dataIndex
 */
export function getActiveIndex(type, multiDataset, datasetIndex, dataIndex) {
    if (ACTIVE_INDEX_DATAINDEX_TYPES.includes(type)) {
        return dataIndex;
    }
    if (multiDataset) {
        return datasetIndex;
    }
    return dataIndex;
}

/**
 * @param {any} val
 * @param {Number} defaultVal
 * @returns {Number}
 */
export function asNumberOrDefault(val, defaultVal) {
    return val ? Number(val) : defaultVal;
}

/**
 * @param {string} kebab
 */
export function kebabToPascal(kebab) {
    const words = kebab.split('-');
    return words.reduce((final, curr) => {
        if (final.length <= 0) {
            final = curr;
        } else {
            final += curr[0].toUpperCase() + curr.substring(1);
        }
        return final;
    });
}

/**
 * @param {Element[]} elements
 */
export async function waitForInitialization(elements) {
    return new Promise(resolve => {
        (function waitForInit() {
            if (elements.every((/** @type ChartDataElement */ el) => el.initialized)) {
                return resolve();
            }
            setTimeout(waitForInit, 100);
        })();
    });
}
