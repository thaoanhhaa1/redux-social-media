import config from '../config';

const { vneseUpper, vneseLower } = config;

const regexName = new RegExp(
    `^[A-Z${vneseUpper}][a-z${vneseLower}]*(\\s[A-Z${vneseUpper}][a-z${vneseLower}]*)*$`,
);

export { regexName };
