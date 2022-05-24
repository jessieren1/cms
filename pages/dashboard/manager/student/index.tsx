import type { NextPage } from 'next';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Popconfirm, Modal, Table, Button, Input, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';
import { formatDistanceToNow } from 'date-fns';
import styled from 'styled-components';
import Link from 'next/link';
import { AddStudentForm } from 'components/student/AddStudentForm';
import { deleteStudent, getStudents, addStudent, editStudent } from 'lib/services/student-api';
import { Student, EditStudent, AddStudent, Course, Type } from '../../../../model/student';

const { Search } = Input;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

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
    let params: AddStudent | EditStudent = {
      name: e.name,
      country: e.country,
      email: e.email,
      type: e.type === 'tester' ? 1 : 2,
      id: null,
    };

    if (editingStudent !== null) {
      params = { ...params, id: editingStudent.id };
      editStudent(params);
    } else {
      addStudent(params);
    }

    setIsModalVisible(false);
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
              deleteStudent(record.id).then((res: any) => {
                const { data: isDeleted } = res;
                if (isDeleted) {
                  const index = data.findIndex((item) => item.id === record.id);
                  const updatedData = [...data];

                  updatedData.splice(index, 1);
                  setData(updatedData);
                  setTotal(total - 1);
                }
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

    getStudents(params).then((res: any) => {
      if (res.data) {
        setData(res.data.students);
        setTotal(res.data.total);
      }
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

const StudentList: NextPage = () => {
  return <LoadStudentList />;
};

export default StudentList;
