import React from 'react';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';
import { Layout, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import AppBreadcrumb from './Breadcrumb';
import { logout } from 'lib/services/auth-api';
const { Header, Content, Footer, Sider } = Layout;

export default function DashboardPage(props: React.PropsWithChildren<any>) {
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();

  function handleLogout() {
    logout().then(() => {
      router.push('/');
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      >
        <div className={styles.logo} />
        {props.left}
      </Sider>
      <Layout className={styles.site_layout}>
        <Header className={styles.site_layout_background} style={{ padding: 0 }} />
        <div className={styles.out}>
          <Button type="primary" onClick={handleLogout} icon={<PoweroffOutlined />}>
            Log Out
          </Button>
        </div>

        <Content style={{ margin: '0 16px' }}>
          <AppBreadcrumb />
          <div className={styles.site_layout_background} style={{ padding: 24, minHeight: 360 }}>
            {props.center}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
