import React from 'react';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function DashboardPage(props: React.PropsWithChildren<any>) {
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();

  function handleLogout() {
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://cms.chtoma.com/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        }
      )
      .then(() => {
        router.push({
          pathname: '/',
        });
      })
      .catch((error) => {
        console.log(error);
        message.error('Unknown Error');
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
          <div className={styles.site_layout_background} style={{ padding: 24, minHeight: 360 }}>
            {props.center}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
