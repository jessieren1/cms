import { Badge, Card, Col, Collapse, Layout, Row, Steps, Tag } from 'antd';
import { Schedule } from '../../model/course';
import styled from 'styled-components';

const H2 = styled.h2`
  color: #7356f1;
`;

const H3 = styled.h3`
  margin: 1em 0;
`;

const StepsRow = styled(Row)`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  .ant-steps-item-title {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 6em;
  }
`;

export enum CourseStatusText {
  'finished',
  'processing',
  'pending',
}

export enum CourseStatusBadge {
  'warning',
  'success',
  'default',
}

export enum CourseStatusColor {
  'default',
  'green',
  'orange',
}

const getChapterExtra = (source: Schedule, index: number) => {
  const activeIndex = source.chapters.findIndex((item) => item.id === source.current);
  const status = index === activeIndex ? 1 : index < activeIndex ? 0 : 2;

  return <Tag color={CourseStatusColor[status]}>{CourseStatusText[status]}</Tag>;
};

export default function CourseDetailCard(props: any) {
  return (
    <Col offset={1} span={15}>
      <Card>
        <H2>Course Detail</H2>

        <H3>Create Time</H3>
        <Row>{props.course?.createdAt}</Row>

        <H3>Start Time</H3>
        <Row>{props.course?.startTime}</Row>

        <Badge status={CourseStatusBadge[props.course?.status] as any} offset={[5, 24]}>
          <H3>Status</H3>
        </Badge>

        <StepsRow>
          <Steps size="small" current={props.activeChapterIndex} style={{ width: 'auto' }}>
            {props.course?.schedule.chapters.map((item: any) => (
              <Steps.Step title={item.name} key={item.id}></Steps.Step>
            ))}
          </Steps>
        </StepsRow>

        <H3>Course Code</H3>
        <Row>{props.course?.uid}</Row>

        <H3>Class Time</H3>
        {/* // <ClassScheduleTable classTime={course.schedule.classTime} /> */}

        <H3>Category</H3>
        <Row>
          {props.course?.type.map((item: any) => (
            <Tag color="#3F556D" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </Row>

        <H3>Description</H3>
        {/** FIXME just for test purpose */}
        {props.course?.detail !== 'no' ? (
          <Row>{props.course?.detail}</Row>
        ) : (
          <Row>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, iure soluta.
            Perspiciatis, odit perferendis suscipit alias aut voluptatem aliquam dolorem rerum animi
            tempore nostrum cum non temporibus rem cupiditate optio.
          </Row>
        )}

        <H3>Chapter</H3>
        {props.course?.schedule && (
          <Collapse defaultActiveKey={props.course.schedule.current}>
            {props.course.schedule.chapters.map((item: any, index: number) => (
              <Collapse.Panel
                header={item.name}
                key={item.id}
                extra={getChapterExtra(props.course.schedule, index)}
              >
                <p>{item.content}</p>
              </Collapse.Panel>
            ))}
          </Collapse>
        )}
      </Card>
    </Col>
  );
}
