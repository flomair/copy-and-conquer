

import { Types } from './action-types';
import {$Template$Action,$Template$} from '../../models/$template$.model'
import {Loading} from 'src/models/loading.model'


const initialState :$Template$= {
  data: {},
  loading : <Loading>{
    fetching : false,
    failed: false,
    loaded:false,

  }
}

export default (state :$Template$ = initialState, action: $Template$Action) => {
  // 
  switch (action.type) {
    case Types.$template$_FetchFull:

    return {...state, 
      loading:{
        fetching: true,
        loaded: false,
        failed: false,
        message: ''
       }
      }

   
    case Types.$template$_FetchFullSucces:
  
    if(!action.payload)
       return state
    return {
      ...state,
      loading:{
        fetching: false,
        loaded: true,
        failed: false,
        message: ''
       },
       data:action.payload
      }
    
    //action.payload.map(d => d);

    default:
      return state;
  }
};