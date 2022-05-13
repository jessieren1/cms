import {
  EditOutlined,
  FileAddOutlined,
  PieChartOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  {
    title: 'Overview',
    path: '',
    icon: <PieChartOutlined />,
  },
  {
    title: 'Class Schedule',
    path: 'schedule',
    icon: <PieChartOutlined />,
  },
  {
    title: 'Student',
    path: 'student',
    icon: <SolutionOutlined />,
    subNav: [
      {
        title: 'Student List',
        path: 'student',
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    title: 'Teacher',
    path: 'teacher',
    icon: <SolutionOutlined />,
    subNav: [
      {
        title: 'Teacher List',
        path: 'teacher',
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    title: 'Course',
    path: 'course',
    icon: <ReadOutlined />,
    subNav: [
      {
        title: 'All Courses',
        path: 'course',
        icon: <ProjectOutlined />,
      },
      {
        title: 'Add Course',
        path: 'add-course',
        icon: <FileAddOutlined />,
      },
      {
        title: 'Edit Course',
        path: 'edit-course',
        icon: <EditOutlined />,
      },
    ],
  },
];

const renderSideMenu = (sideNav: any, parentPath: string[]) => {
  return sideNav.map((item: any) => {
    const itemPath =
      parentPath.slice(-1)[0] === item.path ? parentPath : [...parentPath, item.path];

    const subMenuKey = itemPath.slice(3, 4).toString();
    if (item.subNav && !!item.subNav.length) {
      return (
        <Menu.SubMenu key={subMenuKey} title={item.title} icon={item.icon}>
          {renderSideMenu(item.subNav, itemPath)}
        </Menu.SubMenu>
      );
    } else {
      return item.isHideInSiderNav ? null : (
        <Menu.Item key={itemPath.join('/')} icon={item.icon}>
          <Link href={itemPath.join('/')}>
            <a>{item.title}</a>
          </Link>
        </Menu.Item>
      );
    }
  });
};

export default function ManagerSide() {
  const router = useRouter();
  const paths = router.pathname.split('/');
  const rolePath = paths.slice(0, 3);
  return (
    <Menu theme="dark" mode="inline" style={{ borderRight: 0 }}>
      {renderSideMenu(navLinks, rolePath)}
    </Menu>
  );
}
