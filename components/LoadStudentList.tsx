import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Popconfirm, Modal, Table, Button, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ColumnType } from 'antd/lib/table';
import { formatDistanceToNow } from 'date-fns';
import styled from 'styled-components';
import Link from 'next/link';
import { AddStudentForm } from './AddStudentForm';

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

interface Params {
  id: number | null;
  email: string;
  name: string;
  country: string;
  type: number;
}

function LoadStudentList() {
  const [data, setData] = useState<Student[]>([]);
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [queryName, setQueryName] = useState('');
  const [total, setTotal] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  const handleSubmit = (e: any) => {
    let param: Params = {
      name: e.name,
      country: e.country,
      email: e.email,
      type: e.type === 'tester' ? 1 : 2,
      id: null,
    };

    if (editingStudent !== null) {
      param = { ...param, id: editingStudent.id };
    }

    setIsModalVisible(false);
    console.log(e);
    axios
      .put('http://cms.chtoma.com/api/students', param, {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      render: (_, record: Student) => (
        <>
          <a
            onClick={() => {
              setIsModalVisible(true);
              setEditingStudent(record);
            }}
          >
            Edit
          </a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              axios
                .delete(`http://cms.chtoma.com/api/students/${record.id}`, {
                  headers: {
                    Authorization: `Bearer  ${localStorage.getItem('token')}`,
                  },
                })
                .then((res) => {
                  const { data: isDeleted } = res;

                  if (isDeleted) {
                    const index = data.findIndex((item) => item.id === record.id);
                    const updatedData = [...data];

                    updatedData.splice(index, 1);
                    setData(updatedData);
                    setTotal(total - 1);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            okText="Confirm"
            cancelText="Cancel"
          >
            <a> Delete</a>
          </Popconfirm>
        </>
      ),
    },
  ];

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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalVisible(true);
            setEditingStudent(null);
          }}
        >
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

      <Modal
        title={editingStudent === null ? 'Add Student' : 'Edit Student'}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <AddStudentForm
          editingStudent={editingStudent}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </Modal>

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
