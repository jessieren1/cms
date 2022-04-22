import { Menu } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

export default function TeacherSide() {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        Overview
      </Menu.Item>

      <Menu.Item key="2" icon={<PieChartOutlined />}>
        Class Schedule
      </Menu.Item>

      <SubMenu key="sub1" icon={<PieChartOutlined />} title="Students">
        <Menu.Item key="3">
          {' '}
          <Link href="/dashboard/teacher/student">
            <a>Student List</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub2" icon={<PieChartOutlined />} title="Courses">
        <Menu.Item key="4">All Courses</Menu.Item>
        <Menu.Item key="5">Add Courses</Menu.Item>
        <Menu.Item key="6">Edit Courses</Menu.Item>
      </SubMenu>

      <Menu.Item key="7" icon={<FileOutlined />}>
        Class Schedule
      </Menu.Item>

      <Menu.Item key="8" icon={<FileOutlined />}>
        Message
      </Menu.Item>
    </Menu>
  );
}
