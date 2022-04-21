import React from 'react';
import 'antd/dist/antd.css';
import styles from '../../styles/Home.module.css';
import { Layout, Menu, Breadcrumb } from 'antd';
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
export default function DashboardPage() {
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();
  const token = localStorage.getItem('token');

  function handleLogout() {
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

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      {/* how to access css here?? */}
      <Layout className={styles.site_layout}>
        <Header className={styles.site_layout_background} style={{ padding: 0 }} />
        <div className={styles.out}>
          <Button type="primary" onClick={handleLogout} icon={<PoweroffOutlined />}>
            Log Out
          </Button>
        </div>

        <Content style={{ margin: '0 16px' }}>
          <div className={styles.site_layout_background} style={{ padding: 24, minHeight: 360 }}>
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
