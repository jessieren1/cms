import React from 'react';
import 'antd/dist/antd.css';
import styles from '../../styles/Home.module.css';
import { Layout, Button, Dropdown, Tabs, Col, Row } from 'antd';
import { BellOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import AppBreadcrumb from './Breadcrumb';
import { logout } from 'lib/services/auth-api';
const { Header, Content, Footer, Sider } = Layout;
import ManagerSider from './ManagerSider';
import Link from 'next/link';
import styled from 'styled-components';

const { TabPane } = Tabs;

const MessageContainer = styled.div`
  height: 380px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const TabNavContainer = styled.div`
  margin-bottom: 0;
  padding: 10px 20px 0 20px;
  .ant-tabs-nav-list {
    width: 100%;
    justify-content: space-around;
  }
`;

const DropdownFooter = styled(Row)`
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 4px 4px;
  border: 1px solid #f0f0f0;
  border-left: none;
  border-right: none;
  background: #fff;
  z-index: 9;
  .ant-col {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      box-shadow: 1px 0 0 0 #f0f0f0;
    }
  }
  button {
    border: none;
  }
`;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
        {<ManagerSider />}
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <div className={styles.out}>
          <Dropdown
            overlayStyle={{
              background: '#fff',
              borderRadius: 4,
              width: 400,
              height: 500,
              overflow: 'hidden',
            }}
            placement="bottomRight"
            trigger={['click']}
            overlay={
              <>
                <Tabs
                  renderTabBar={(props, DefaultTabBar) => (
                    <TabNavContainer>
                      <DefaultTabBar {...props} />
                    </TabNavContainer>
                  )}
                  animated
                >
                  <TabPane key={'notification'} tab={'Notification'}>
                    <MessageContainer>
                      <p>Notification</p>
                    </MessageContainer>
                  </TabPane>
                  <TabPane key={'message'} tab={'Message'}>
                    <MessageContainer>
                      <p>Message</p>
                    </MessageContainer>
                  </TabPane>
                </Tabs>

                <DropdownFooter>
                  <Col span={12}>
                    <Button>Mark all as read</Button>
                  </Col>
                  <Col span={12}>
                    <Button>
                      <Link href={''}>View history</Link>
                    </Button>
                  </Col>
                </DropdownFooter>
              </>
            }
          >
            <BellOutlined style={{ fontSize: 24, marginRight: 20, color: 'white' }} />
          </Dropdown>

          <Dropdown
            overlay={
              <Button type="primary" onClick={handleLogout} icon={<PoweroffOutlined />}>
                Log Out
              </Button>
            }
            placement="bottomLeft"
          >
            <Button shape="circle" icon={<UserOutlined />}></Button>
          </Dropdown>
        </div>

        <Content style={{ margin: '0 16px' }}>
          <AppBreadcrumb />
          <div style={{ padding: 24, minHeight: 600 }}>{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Footer ©2022
        </Footer>
      </Layout>
    </Layout>
  );
}
