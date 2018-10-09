import { getRequest } from 'src/lib/fetchData/makeRequest';
import {$Template$Response} from '../../models/$template$.model'

export const fetch$Template$ = async ({ type, value }: { type: string, value: string }): Promise<$Template$Response> => {
  try {
    const params = `/api/$template$/${type}/${value}`,
      data = await getRequest( params)
    return data
  } catch (e) {
    console.log(e)
    throw e
  }
}
