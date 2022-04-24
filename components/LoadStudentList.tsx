import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ColumnType } from 'antd/lib/table';
import { formatDistanceToNow } from 'date-fns';
import styled from 'styled-components';

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
    dataIndex: 'No.',
    key: 'No.',
    fixed: 'left',
    render(_1: any, _2: any, index: number) {
      return index + 1;
    },
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
  const [data, setData] = useState<Student[]>([]);
  const [paginator, SetPaginator] = useState({ page: 1, limit: 20 });
  const [queryName, setQueryName] = useState('');

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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paginator, queryName]);

  function onSearch(value: any) {
    setQueryName(value);
  }

  return (
    <>
      <FlexContainer>
        <Button type="primary" icon={<PlusOutlined />}>
          Add
        </Button>
        <Space direction="vertical">
          <Search onSearch={onSearch} placeholder="search by name" style={{ width: 200 }} />
        </Space>
      </FlexContainer>
      <Table columns={columns} dataSource={data} sticky />
    </>
  );
}

export default LoadStudentList;
