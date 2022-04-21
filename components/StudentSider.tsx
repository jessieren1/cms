import { Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

export default function Student() {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        Overview
      </Menu.Item>

      <SubMenu key="sub1" icon={<PieChartOutlined />} title="Courses">
        <Menu.Item key="2">All Courses</Menu.Item>
        <Menu.Item key="3">My Courses</Menu.Item>
      </SubMenu>

      <Menu.Item key="4" icon={<FileOutlined />}>
        Class Schedule
      </Menu.Item>

      <Menu.Item key="5" icon={<FileOutlined />}>
        Message
      </Menu.Item>
    </Menu>
  );
}
