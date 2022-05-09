import { useRouter } from 'next/router';
import React from 'react';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export default function AppBreadcrumb() {
  const router = useRouter();
  const path = router.pathname;
  const paths = path.split('/').slice(1);
  const root = '/' + paths.slice(0, 2).join('/');

  const routes: { path: string; breadcrumbName: string }[] = paths.map((e) => {
    return {
      path: e,
      breadcrumbName: e,
    };
  });

  function itemRender(route: any, params: any, routes: any, paths: any) {
    const isOverviewPage = paths.length <= 2;
    const subPage = '/' + paths.join('/');

    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link href={isOverviewPage ? root : subPage}>{route.breadcrumbName}</Link>
    );
  }

  return <Breadcrumb itemRender={itemRender} routes={routes} style={{ margin: '16px 0' }} />;
}
