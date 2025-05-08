import axios from 'axios';
import {isEmpty} from './validations';

export const stringify = (
  params: {[key: string]: number | number[] | string | string[] | boolean},
  excludeKey: string[] = [],
) => {
  let result = '';

  if (!params) return '';

  Object.keys(params).forEach(key => {
    if (!isEmpty(params[`${key}`]) || excludeKey.includes(`${key}`)) {
      if (Array.isArray(params[`${key}`])) {
        const array = params[`${key}`] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[`${key}`].toString())}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};

export function newCancelToken(timeout = 300000) {
  const source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);

  return {cancelToken: source.token};
}
