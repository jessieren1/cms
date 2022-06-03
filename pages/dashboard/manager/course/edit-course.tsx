import Head from 'next/head';
import { Col, Input, Row, Select, Tabs } from 'antd';
import React, { useState } from 'react';
import { Course, CourseSearchBy, CourseSearchBySelect } from 'model/course';
import { OptionValue } from 'model/common';
import { getCourses } from 'lib/services';
import CourseSchedule from 'components/course/CourseSchedule';
import DebouncedSearchSelect from 'components/common/DebouncedSearchSelect';
import CourseForm from 'components/course/CourseForm';

const { Option } = Select;

export default function Page() {
  const [searchBy, setSearchBy] = useState<CourseSearchBy>('uid');
  const [searchResult, setSearchResult] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(null);

  async function fetchList(searchByValue: string): Promise<OptionValue[]> {
    return getCourses({ [searchBy]: searchByValue }).then((res: any) => {
      setSearchResult(res.data.courses);
      return res.data.courses.map((course: { name: any; id: any }) => ({
        label: course.name,
        value: course.id,
      }));
    });
  }

  return (
    <>
      <Row gutter={[16, 24]} style={{ paddingBottom: 16 }}>
        <Col span={12}>
          <Input.Group compact size="large" style={{ display: 'flex' }}>
            <Select
              defaultValue="uid"
              onChange={(value: CourseSearchBy) => setSearchBy(value)}
              style={{ flex: 1 }}
            >
              {CourseSearchBySelect.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
            <DebouncedSearchSelect
              style={{ flex: 3 }}
              placeholder={`search and select by ${searchBy}`}
              fetchOptions={fetchList}
              onSelect={(id: number) => {
                const course = searchResult.find((item) => item.id === id);
                setCourse(course || null);
              }}
            />
          </Input.Group>
        </Col>
      </Row>

      <Tabs type="card" size="large" animated>
        <Tabs.TabPane key="course" tab="Course Detail">
          <CourseForm course={course} />
        </Tabs.TabPane>

        <Tabs.TabPane key="chapter" tab="Course Schedule">
          <CourseSchedule course={course} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
