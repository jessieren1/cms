import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import styles from './CourseForm.module.css';
import { PlusOutlined } from '@ant-design/icons';

const CourseSchedule: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <div className={styles.schedule1}>
        <h2>Chapters</h2>
        <Row>
          <Col span={10}>
            <Form.Item name="chapterName" rules={[{ required: true }]}>
              <Input placeholder="Chapter Name" />
            </Form.Item>
          </Col>
          <Col span={12} offset={2}>
            <Form.Item name="chapterContent" rules={[{ required: true }]}>
              <Input placeholder="Chapter Content" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item>
              <Button type="dashed" size="large" block icon={<PlusOutlined />}>
                Add Chapter
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className={styles.schedule2}>
        <h2>Class Time</h2>
        <Row>
          <Col span={10}>
            <Form.Item name="chapterName" rules={[{ required: true }]}>
              <Input placeholder="Chapter Name" />
            </Form.Item>
          </Col>
          <Col span={12} offset={2}>
            <Form.Item name="chapterContent" rules={[{ required: true }]}>
              <Input placeholder="Chapter Content" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item>
              <Button type="dashed" size="large" block icon={<PlusOutlined />}>
                Add Class Time
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseSchedule;
