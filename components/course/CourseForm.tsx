import React from 'react';
import { Form, Input, InputNumber, Button, Row, DatePicker, Select, Col } from 'antd';
import styles from './CourseForm.module.css';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

const selectAfter = (
  <Select defaultValue="month" className="select-after">
    <Select.Option value="year">year</Select.Option>
    <Select.Option value="month">month</Select.Option>
    <Select.Option value="day">day</Select.Option>
    <Select.Option value="week">week</Select.Option>
    <Select.Option value="hour">hour</Select.Option>
  </Select>
);

const CourseForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <div className={styles.wrapper}>
        <div className={styles.box1}>
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{ required: true }, { max: 100, min: 3 }]}
          >
            <Input type="text" placeholder="course name" />
          </Form.Item>
        </div>

        <div className={styles.box2}>
          <Row className="flex justify-between">
            <Col span={7} offset={1}>
              <Form.Item label="Teacher" name="teacherId">
                <Select placeholder="Select teacher"></Select>
              </Form.Item>
            </Col>

            <Col span={7} offset={1}>
              <Form.Item label="Type" name="type">
                <Select mode="multiple"></Select>
              </Form.Item>
            </Col>

            <Col span={7} offset={1}>
              <Form.Item label="Course Code" name="uid">
                <Input type="text" placeholder="course code" disabled />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className={styles.box3}>
          <Form.Item label="Start Date" name="startTime">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // @ts-ignore
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label="Student Limit" name="maxStudents" rules={[{ required: true }]}>
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }} label="Duration" name="duration">
            <InputNumber addonAfter={selectAfter} style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <div className={styles.box4}>
          <Row style={{ height: '100%' }}>
            <Col span={11} offset={1} style={{ height: '100%' }}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Course description"
                name="detail"
                rules={[{ required: true }]}
              >
                <TextArea placeholder="Course description" style={{ height: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={11} offset={1} style={{ height: '100%' }}>
              <Form.Item style={{ marginBottom: 0 }} label="Cover" name="cover">
                <Dragger style={{ height: '100%' }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
