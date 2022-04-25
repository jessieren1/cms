import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Select, Form, Modal, Table, Button, Input, Space } from 'antd';
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

function LoadStudentList() {
  const [data, setData] = useState<Student[]>([]);
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [queryName, setQueryName] = useState('');
  const [total, setTotal] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (e: any) => {
    setIsModalVisible(false);
    console.log(e);
    axios
      .post(
        'http://cms.chtoma.com/api/students',
        {
          name: e.name,
          country: e.country,
          email: e.email,
          type: e.type === 'tester' ? 1 : 2,
        },
        {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem('token')}`,
          },
        }
      )
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
            }}
          >
            Edit
          </a>
          <a>Delete</a>
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
        title="Add Student"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="country" label="Area" rules={[{ required: true }]}>
            <Select allowClear>
              <Select.Option value="china">China</Select.Option>
              <Select.Option value="new_zealand">New Zealand</Select.Option>
              <Select.Option value="canada">Canada</Select.Option>
              <Select.Option value="australia">Australia</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="type" label="Student Type" rules={[{ required: true }]}>
            <Select allowClear>
              <Select.Option value="tester">Tester</Select.Option>
              <Select.Option value="developer">Developer</Select.Option>
            </Select>
          </Form.Item>
        </Form>
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
