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

const DescriptionTextArea = styled(Form.Item)`
  .ant-form-item-control-input,
  .ant-form-item-control-input-content,
  text-area {
    height: 100%;
  }
`;

const UploadItem = styled(Form.Item)`
  .ant-form-item-control-input,
  .ant-form-item-control-input div {
    height: 100%;
  }
`;

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
              <Form.Item label="Teacher" name="teacherId" rules={[{ required: true }]}>
                <Select placeholder="Select teacher"></Select>
              </Form.Item>
            </Col>

            <Col span={7} offset={1}>
              <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                <Select mode="multiple"></Select>
              </Form.Item>
            </Col>

            <Col span={7} offset={1}>
              <Form.Item label="Course Code" name="uid" rules={[{ required: true }]}>
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
          <Row className="flex justify-between">
            <Col span={11} offset={1}>
              <DescriptionTextArea
                style={{ height: '100%' }}
                label="Description"
                name="detail"
                rules={[
                  { required: true },
                  {
                    min: 100,
                    max: 1000,
                    message: 'Description length must between 100 - 1000 characters.',
                  },
                ]}
              >
                <TextArea placeholder="Course description" style={{ height: '100%' }} />
              </DescriptionTextArea>
            </Col>

            <Col span={11} offset={1}>
              <UploadItem label="Cover" style={{ height: '100%' }}>
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company
                    data or other band files
                  </p>
                </Dragger>
              </UploadItem>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
};

export default CourseForm;
