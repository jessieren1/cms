import DashboardLayout from '../../../../components/DashboardLayout';
import type { NextPage } from 'next';
import ManagerSider from 'components/ManagerSider';
import { useRouter } from 'next/router';
import { getSingleStudent } from 'lib/services/student-api';
import React, { useEffect, useState } from 'react';
import { StudentResponse, Course, Type } from 'model/student';
import { Card, Avatar, Col, Row, Tabs, Tag, Divider } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Table, { ColumnType } from 'antd/lib/table';
import Link from 'next/link';

export const H3 = styled.h3`
  color: #7356f1;
  margin: 20px 0px;
  font-size: 24px;
`;

const programLanguageColors: string[] = [
  'magenta',
  'volcano',
  'orange',
  'gold',
  'green',
  'cyan',
  'geekblue',
  'purple',
  'red',
  'lime',
];

const { Meta } = Card;

function SingleStudent() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<StudentResponse | null>(null);

  const about = [
    { label: 'Eduction', value: data?.education },
    { label: 'Area', value: data?.country },
    { label: 'Gender', value: data?.gender === 1 ? 'Male' : 'Female' },
    { label: 'Member Period', value: data?.memberStartAt + ' - ' + data?.memberEndAt },
    { label: 'Type', value: data?.type?.name },
    { label: 'Create Time', value: data?.createdAt },
    { label: 'Update Time', value: data?.updatedAt },
  ];

  const info = [
    { label: 'Name', value: data?.name },
    { label: 'Age', value: data?.age },
    { label: 'Email', value: data?.email },
    { label: 'Phone', value: data?.phone },
  ];

  const columns: ColumnType<Course>[] = [
    {
      title: 'No.',
      key: 'index',
      render: (_1, _2, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => (
        <Link href={`/dashboard/${localStorage.getItem('role')}/courses/${record.id}`}>
          {value}
        </Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type: Type[]) => type.map((item) => item.name).join(','),
    },
    {
      title: 'Join Time',
      dataIndex: 'createdAt',
    },
  ];

  useEffect(() => {
    getSingleStudent(parseInt(id as string)).then((res: any) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <Row>
      <Col span={8}>
        <Card style={{ marginRight: '20px' }}>
          <Avatar
            src={data?.avatar}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
            style={{ display: 'block', margin: 'auto' }}
          />
          <Divider />
          <Row>
            {info.map((item) => (
              <Col span={12} key={item.label} style={{ textAlign: 'center' }}>
                <b>{item.label}</b>
                <p>{item.value}</p>
              </Col>
            ))}
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <b>Address</b>
              <p>{data?.address}</p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={16}>
        <Card>
          <Tabs defaultActiveKey="1" animated={true}>
            <Tabs.TabPane tab="About" key="1">
              <H3>Information</H3>

              <Row gutter={[6, 16]}>
                {about.map((item) => (
                  <Col span={24} key={item.label}>
                    <b style={{ marginRight: 16, minWidth: 150, display: 'inline-block' }}>
                      {item.label}:
                    </b>
                    <span>{item.value}</span>
                  </Col>
                ))}
              </Row>

              <H3>Interesting</H3>

              <Row gutter={[6, 16]}>
                <Col>
                  {data?.interest.map((item, index) => (
                    <Tag
                      color={programLanguageColors[index]}
                      key={item}
                      style={{ padding: '5px 10px' }}
                    >
                      {item}
                    </Tag>
                  ))}
                </Col>
              </Row>

              <H3>Description</H3>

              <Row gutter={[6, 16]}>
                <Col style={{ lineHeight: 2 }}>{data?.description}</Col>
              </Row>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Courses" key="2">
              <Table dataSource={data?.courses} columns={columns} rowKey="id"></Table>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
}

const StudentList: NextPage = () => {
  return <DashboardLayout>{<SingleStudent />}</DashboardLayout>;
};

export default StudentList;
