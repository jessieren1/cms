import { useState, useEffect } from 'react';
import { Badge, Card, Col, Collapse, Layout, Row, Steps, Tag } from 'antd';
import { getSingleCourse } from 'lib/services/course-api';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { CourseCard } from 'components/course/CourseCard';
import styled from 'styled-components';
import { CourseDetail, Schedule } from '../../../../model/course';
import CourseDetailCard from 'components/course/CourseDetail';

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border: 1px solid #f0f0f0;
  border-left: none;
  border-bottom: none;
  :last-child {
    border-right: none;
  }
  p {
    margin-bottom: 0;
  }
  b {
    color: #7356f1;
    font-size: 24px;
  }
`;

const StyledRow = styled(Row)`
  width: calc(100% + 48px);
  margin: 0 0 0 -24px !important;
`;

function SingleCourse() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<CourseDetail>();
  const [info, setInfo] = useState<{ label: string; value: string | number }[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    getSingleCourse({ id: id }).then((res: any) => {
      if (res.data) {
        setCourse(res.data);
        const sales = res.data.sales;
        const info = [
          { label: 'Price', value: sales.price },
          { label: 'Batches', value: sales.batches },
          { label: 'Students', value: sales.studentAmount },
          { label: 'Earings', value: sales.earnings },
        ];
        setInfo(info);
        setActiveChapterIndex(
          res.data.schedule.chapters.findIndex((item: any) => item.id === res.data.schedule.current)
        );
      }
    });
  }, [id]);

  return (
    <Layout>
      <Row gutter={[6, 16]}>
        <Col span={8}>
          <CourseCard {...course} cardProps={{ bodyStyle: { paddingBottom: 0 } }}>
            <StyledRow gutter={[6, 16]} justify="space-between" align="middle">
              {info.map((item, index) => (
                <StyledCol span="6" key={index}>
                  <b>{item.value}</b>
                  <p>{item.label}</p>
                </StyledCol>
              ))}
            </StyledRow>
          </CourseCard>
        </Col>

        <CourseDetailCard course={course} activeChapterIndex={activeChapterIndex} />
      </Row>
    </Layout>
  );
}

const SingleCoursePage: NextPage = () => {
  return <SingleCourse />;
};

export default SingleCoursePage;
