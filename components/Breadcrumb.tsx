import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';

export default function AppBreadcrumb() {
  const router = useRouter();
  const path = router.pathname;
  const paths = path.split('/').slice(1);
  const root = '/' + paths.slice(0, 2).join('/');

  const routes: { path: string; breadcrumbName: string }[] = [];

  paths.forEach((element, index) => {
    routes.push({
      path: element,
      breadcrumbName: element,
    });
  });

  return <PageHeader className="site-page-header" breadcrumb={{ routes }} />;
}

// return (
//   <Breadcrumb style={{ margin: '0 16px', padding: 16 }}>
//     <Breadcrumb.Item> AppBreadcrumb</Breadcrumb.Item>
//   </Breadcrumb>
// );
