import { Dispatch, Loading } from '@/models/connect';

export default interface IDispatch {
  dispatch: Dispatch;
  loading?: Loading;
}
