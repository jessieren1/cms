import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Course } from '../../../../model/course';
import { getCourses } from '../../../../lib/services/course-api';
import { Button, Card, Col, Divider, List, Row, Spin } from 'antd';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CourseCard } from 'components/CourseCard';
import BackTop from 'components/BackTop';

export function CoursePage() {
  const [data, setData] = useState<Course[]>([]);
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let params: Record<string, string | number> = { ...paginator };
    getCourses(params).then((res: any) => {
      if (res.data) {
        setData((pre) => [...pre, ...res.data.courses]);
        if (res.data.total <= paginator.page * paginator.limit) {
          setHasMore(false);
        }
      }
    });
  }, [paginator]);

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPaginator({ ...paginator, page: paginator.page + 1 })}
        // hasMore={data.length < 50}
        hasMore={hasMore}
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
              <CourseCard {...item}>
                <Link
                  href={`/dashboard/${localStorage.getItem('role')}/course/${item.id}`}
                  passHref
                >
                  <Button type="primary">Read More</Button>
                </Link>
              </CourseCard>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <BackTop targetId="scrollableDiv" visibilityHeight={800} />
    </>
  );
}

const Course: NextPage = () => {
  return <CoursePage />;
};

export default Course;
