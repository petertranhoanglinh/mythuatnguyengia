import { setProductName } from './../actions/header.action';
import { createReducer, on } from '@ngrx/store';
import { HeaderState } from '../selectors/header.selector';
import { setIsHeader, setPageHeading } from '../actions/header.action';
import { PageHeading } from '../model/page-heading';


export const headerFeatureKey = 'headerKey';

export const initialState: HeaderState = {
  items : [] as [],
  isHeader: {} as Boolean,
  pageHeading:{} as PageHeading ,
  productname :  {} as string
}

export const headerReducer = createReducer(
  initialState,
  on(setIsHeader, (state, { isHeader }) => ({...state, isHeader:isHeader })),
  on(setPageHeading, (state, { pageHeading }) => ({...state, pageHeading:pageHeading })),

  on(setProductName, (state, { productname }) => ({ ...state, productname }))
);
