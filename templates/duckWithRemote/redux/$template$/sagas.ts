import {Types} from './action-types';
import { call, put,takeLatest,all} from 'redux-saga/effects';
import {$template$FetchSuccess,$template$FetchError, $template$Fetch} from './actions';
import {fetch$Template$} from '../../lib/fetchData/fetch$Template$'
import { $Template$ } from '../../models/$template$.model';






export function* fetch$Template$Saga(action: { payload: {type:string,value:string}, type: string }) {
  try {
   //  
    //yield put($template$Fetch())
  
    //const result: {machines: Array<$Template$>,infos :Array<Info>} = yield call(fetch$Template$);
    const result: $Template$ = yield call(fetch$Template$,action.payload);
   //  
    yield put($template$FetchSuccess(result));
    //yield put(infoFetchSuccess(result.infos));
  } catch (err) {
    yield put($template$FetchError(err));
  }
}

export function* $template$Watcher() {
  yield all([
    yield takeLatest(Types.$template$_FetchFull,fetch$Template$Saga),
  ])
}