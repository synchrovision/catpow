export const testFlags = (cond, flags) => cond & (flags === cond);
export const filterArrayWithFlags = (array, flags) => array.filter((c, i) => flags & (1 << i));

export { wordsToFlags, flagsToWords, classNamesToFlags, flagsToClassNames, filterFlags } from "catpow/util";
