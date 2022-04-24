import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import axios from 'axios';
import { ColumnType } from 'antd/lib/table';
import { formatDistanceToNow } from 'date-fns';

interface RootObject {
  data: Data;
  code: number;
  msg: string;
}

interface Data {
  total: number;
  students: Student[];
  paginator: Paginator;
}

interface Paginator {
  page: number;
  limit: number;
}

interface Student {
  createdAt: string;
  updatedAt: string;
  id: number;
  email: string;
  name: string;
  country: string;
  profileId: number;
  type: Type;
  courses: Course[];
}

interface Course {
  id: number;
  courseId: number;
  name: string;
}

interface Type {
  id: number;
  name: string;
}

const columns: ColumnType<Student>[] = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Area',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Selected Curriculum',
    dataIndex: 'courses',
    key: 'courses',
    render(value: Course[]) {
      return value.map((item) => item.name).join(',');
    },
  },
  {
    title: 'Student Type',
    dataIndex: 'type',
    key: 'type',
    render(value: Type) {
      return value.name;
    },
  },
  {
    title: 'Join Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render(value) {
      return formatDistanceToNow(new Date(value));
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <>
        <a>Edit </a>
        <a>Delete</a>
      </>
    ),
  },
];

function LoadStudentList() {
  const [data, setData] = React.useState<Student[]>([]);

  React.useEffect(() => {
    axios
      .get('http://cms.chtoma.com/api/students', {
        params: {
          page: 1,
          limit: 200,
        },
        headers: {
          Authorization: `Bearer  ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <Table columns={columns} dataSource={data} sticky />;
}

export default LoadStudentList;
