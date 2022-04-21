import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

export default function AppBreadcrumb() {
  const router = useRouter();
  const path = router.pathname;
  const paths = path.split('/').slice(1);
  const root = '/' + paths.slice(0, 2).join('/');

  return (
    <Breadcrumb style={{ margin: '0 16px', padding: 16 }}>
      <Breadcrumb.Item> AppBreadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  );
}
