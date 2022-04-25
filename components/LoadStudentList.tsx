import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ColumnType } from 'antd/lib/table';
import { formatDistanceToNow } from 'date-fns';
import styled from 'styled-components';
import Link from 'next/link';

const { Search } = Input;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

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
    key: 'index',
    fixed: 'left',
    render(_1: any, _2: any, index: number) {
      return index + 1;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (pre: Student, next: Student) => {
      const preCode = pre.name.charCodeAt(0);
      const nextCode = next.name.charCodeAt(0);
      return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
    },
    render: (_, record: Student) => (
      <Link href={`/dashboard/manager/student/${record.id}`}>{record.name}</Link>
    ),
  },
  {
    title: 'Area',
    width: '10%',
    dataIndex: 'country',
    filters: ['China', 'New Zealand', 'Canada', 'Australia'].map((item) => ({
      text: item,
      value: item,
    })),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Selected Curriculum',
    dataIndex: 'courses',
    width: '25%',
    render(value: Course[]) {
      return value.map((item) => item.name).join(',');
    },
  },
  {
    title: 'Student Type',
    dataIndex: 'type',
    filters: [
      { text: 'developer', value: 'developer' },
      { text: 'tester', value: 'tester' },
    ],
    render(value: Type) {
      return value.name;
    },
  },
  {
    title: 'Join Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: string) => formatDistanceToNow(new Date(value), { addSuffix: true }),
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
  const [data, setData] = useState<Student[]>([]);
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [queryName, setQueryName] = useState('');
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    let params: Record<string, string | number> = { ...paginator };
    if (queryName) {
      params = { ...params, query: queryName };
    }

    axios
      .get('http://cms.chtoma.com/api/students', {
        params: params,
        headers: {
          Authorization: `Bearer  ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setData(res.data.data.students);
          setTotal(res.data.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paginator, queryName]);

  return (
    <>
      <FlexContainer>
        <Button type="primary" icon={<PlusOutlined />}>
          Add
        </Button>
        <Space direction="vertical">
          <Search
            onSearch={(value: any) => setQueryName(value)}
            placeholder="search by name"
            style={{ width: 200 }}
          />
        </Space>
      </FlexContainer>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        sticky
        pagination={{
          defaultPageSize: 20,
          onChange: (page: number, limit: number) => setPaginator({ page, limit }),
          total,
        }}
      />
    </>
  );
}

export default LoadStudentList;
