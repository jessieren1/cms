import DashboardLayout from '../../../../components/DashboardLayout';
import type { NextPage } from 'next';
import ManagerSider from 'components/Sider/ManagerSider';
import { useRouter } from 'next/router';
import { apiService } from 'lib/services/base-api';
import React, { useEffect, useState } from 'react';
import { StudentResponse, Course, Type } from 'model/student';
import { Card, Avatar, Col, Row, Tabs, Tag } from 'antd';
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
    { label: 'Type', value: data?.type.name },
    { label: 'Create Time', value: data?.ctime },
    { label: 'Update Time', value: data?.updateAt },
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
      dataIndex: 'ctime',
    },
  ];

  useEffect(() => {
    apiService.getSingleStudent(parseInt(id)).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <Row>
      <Col span={8}>
        <Card style={{ width: 400, marginTop: 16 }}>
          <Meta avatar={<Avatar src={data?.avatar} />} title={data?.name} />
          <p>Age : {data?.age}</p>
          <p>Email : {data?.email}</p>
          <p>Phone : {data?.phone}</p>
          <p>Address : {data?.address}</p>
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
  return <DashboardLayout left={<ManagerSider />} center={<SingleStudent />} />;
};

export default StudentList;
