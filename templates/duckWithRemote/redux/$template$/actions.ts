import {Types} from './action-types';
import { $Template$ } from '../../models/$template$.model';


export const $template$Fetch = (type:string,value:string) => {
  return {
    type: Types.$template$_FetchFull,
    payload:{
      type,
      value
    }
  };
};

export const $template$FetchSuccess = (result: $Template$) => {
  return {
    type: Types.$template$_FetchFullSucces,
    payload: result
  };
};

export const $template$FetchError = (error: Error) => {
  return {
    type:Types.$template$_FetchFullError,
    payload: error
  };
};