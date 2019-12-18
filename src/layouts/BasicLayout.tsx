/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import '@/base/style/Theme.less';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState, Dispatch } from '@/models/connect';
import Authorized from '@/utils/Authorized';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from '@ant-design/pro-layout';
import { connect } from 'dva';
import React, { ReactNode, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import defaultSettings from '../../config/defaultSettings';
import logo from '../assets/logo.png';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
  children: ReactNode;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const footerRender: BasicLayoutProps['footerRender'] = () => {
  return (
    <footer
      style={{
        padding: '0px 24px 24px',
        textAlign: 'center',
      }}
    >
      copyright ©{new Date().getFullYear()} {defaultSettings.title}
    </footer>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <ProLayout
      logo={logo}
      disableMobile
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
      title=""
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
