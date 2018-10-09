import  { Loading } from  'src/models/loading.model'



export interface $Template$Response{
    readonly data : any;
}

export interface $Template$ extends $Template$Response{
    readonly loading : Loading;
 }

export interface $Template$Action{
    type: string;
    payload? : $Template$Response;
    meta: object;
}