import { HeartFilled, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { Course } from '../../model/course';
import Link from 'next/link';
import styled from 'styled-components';
import React from 'react';

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

const StyledImage = styled.image`
  height: 250px !important;
`;

const getDuration = (data: Course): string => {
  const { duration } = data;
  const text = `${duration} year`;

  return duration > 1 ? text + 's' : text;
};

export function CourseCard(props: any) {
  return (
    <Card
      cover={
        <img
          alt="Course Image"
          // src={course.cover}
          src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          className={StyledImage}
          style={{
            backgroundColor: '#eee',
          }}
        />
      }
      {...props.cardProps}
    >
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
