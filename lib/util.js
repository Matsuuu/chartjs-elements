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
    return COLORS[index % COLORS.length] + (addOpacity ? "88" : "");
}
