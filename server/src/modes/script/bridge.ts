import { componentHelperName, iterationHelperName } from './transformTemplate';

// this bridge file will be injected into TypeScript service
// it enable type checking and completion, yet still preserve precise option type

export const moduleName = 'vue-editor-bridge';

export const fileName = 'vue-temp/vue-editor-bridge.ts';

const renderHelpers = `
export declare const ${componentHelperName}: {
  (tag: string, data: any, children: any[]): any;
}
export declare const ${iterationHelperName}: {
  <T>(list: T[], fn: (value: T, index: number) => any): any;
  <T>(obj: { [key: string]: T }, fn: (value: T, key: string, index: number) => any): any;
  <T>(obj: object, fn: (value: any, key: string, index: number) => any): any;
}
`;

export const oldContent = `
import Vue from 'vue';
export interface GeneralOption extends Vue.ComponentOptions<Vue> {
  [key: string]: any;
}
export default function bridge<T>(t: T & GeneralOption): T {
  return t;
}
` + renderHelpers;

export const content = `
import Vue from 'vue';
const func = Vue.extend;
export default func;
` + renderHelpers;
