import { RouteProps, match } from 'dva/router';

/**
 * 页面props
 */
export default interface IPageProps {
  match: match;
  route: RouteProps;
  [key: string]: any;
}
