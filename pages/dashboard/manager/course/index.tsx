import DashboardLayout from '../../../../components/DashboardLayout';
import type { NextPage } from 'next';
import ManagerSider from '../../../../components/Sider/ManagerSider';
import { useEffect, useState } from 'react';
import { Course } from '../../../../model/course';
import { getCourses } from '../../../../lib/services/course-api';
import { Button, Card, Col, Divider, List, Row, Spin } from 'antd';
import styled from 'styled-components';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';

const StyledRow = styled(Row)`
  position: relative;
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    background: #f0f0f0;
    width: 100%;
    height: 1px;
  }
`;

const getDuration = (data: Course): string => {
  const { duration, durationUnit } = data;
  const text = `${duration} ${[durationUnit]}`;

  return duration > 1 ? text + 's' : text;
};

export function CourseList(props: any) {
  return (
    <Card cover={<img src={props.cover} style={{ height: 260 }} />} {...props.cardProps}>
      <Row gutter={[6, 16]}>
        <h3>{props.name}</h3>
      </Row>

      <StyledRow gutter={[6, 16]} justify="space-between" align="middle">
        <Col>{props.startTime}</Col>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <HeartFilled style={{ marginRight: 5, fontSize: 16, color: 'red' }} />
          <b>{props.star}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>Duration:</Col>
        <Col>
          <b>{getDuration(props)}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>Teacher:</Col>
        <Col style={{ fontWeight: 'bold' }}>
          {props?.teacherName && <Link href="/dashboard/manager">{props.teacherName}</Link>}
        </Col>
      </StyledRow>

      <Row gutter={[6, 16]} justify="space-between">
        <Col>
          <UserOutlined style={{ marginRight: 5, fontSize: 16, color: '#1890ff' }} />
          <span>Student Limit:</span>
        </Col>
        <Col>
          <b>{props.maxStudents}</b>
        </Col>
      </Row>

      {props.children}
    </Card>
  );
}

export function ScrollMode() {
  const [data, setData] = useState<Course[]>([]);
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });

  useEffect(() => {
    let params: Record<string, string | number> = { ...paginator };
    console.log(paginator);
    getCourses(params).then((res: any) => {
      console.log(res);
      if (res.data) {
        setData(res.data.courses);
      }
    });
  }, [paginator]);

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPaginator({ ...paginator, page: paginator.page + 1 })}
        hasMore={data.length < 50}
        loader={
          <Divider plain>
            <Spin />
          </Divider>
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CourseList {...item}>
                <Link
                  href={`/dashboard/${localStorage.getItem('role')}/courses/${item.id}`}
                  passHref
                >
                  <Button type="primary">Read More</Button>
                </Link>
              </CourseList>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </>
  );
}

const Manager: NextPage = () => {
  return <DashboardLayout left={<ManagerSider />} center={<ScrollMode />} />;
};

export default Manager;
