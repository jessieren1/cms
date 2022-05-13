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

export const generateKey = (data: any, index: number): string => {
  return `${data.title}_${index}`;
};

let keyHref = {};

const renderSideMenu = (sideNav: any, parentPath: string[]) => {
  return sideNav.map((item: any, index: number) => {
    const itemPath =
      parentPath.slice(-1)[0] === item.path ? parentPath : [...parentPath, item.path];

    const href = itemPath.join('/');
    const key = itemPath.slice(3, 4).toString();
    //const key = generateKey(item, index);
    //keyHref = { ...keyHref, href: key };

    if (item.subNav && !!item.subNav.length) {
      return (
        <Menu.SubMenu key={key} title={item.title} icon={item.icon}>
          {renderSideMenu(item.subNav, itemPath)}
        </Menu.SubMenu>
      );
    } else {
      return (
        // <Menu.Item key={key} icon={item.icon}>
        <Menu.Item key={href} icon={item.icon}>
          <Link href={href}>
            <a>{item.title}</a>
          </Link>
        </Menu.Item>
      );
    }
  });
};

export default function ManagerSide() {
  const router = useRouter();

  const path = router.pathname;
  const paths = path.split('/');
  const rolePath = paths.slice(0, 3);

  const openKeys = [router.pathname.split('/').slice(3, 4).toString()];
  const selectedKeys = [
    router.pathname.split('/').slice(-1)[0] === '[id]'
      ? router.pathname.split('/').slice(0, -1).join('/')
      : router.pathname,
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      style={{ borderRight: 0 }}
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectedKeys}
    >
      {renderSideMenu(navLinks, rolePath)}
    </Menu>
  );
}
