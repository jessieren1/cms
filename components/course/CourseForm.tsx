import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Row, DatePicker, Select, Col } from 'antd';
import styles from './CourseForm.module.css';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { ValidateMessages } from '../../lib/constants/common';
import DebouncedSearchSelect from 'components/common/DebouncedSearchSelect';
import {
  getTeachers,
  getCourseType,
  getCourseCode,
  updateCourse,
  addCourse,
} from '../../lib/services';
import { OptionValue } from 'model/common';
import { Course, CourseType } from 'model/course';
import { disabledDate } from 'lib/util/common';

const FullHeightFormItem = styled(Form.Item)`
  width: 100%;
  .ant-form-item {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .ant-form-item-control {
    flex: 1;
  }
  .ant-form-item-control-input,
  .ant-form-item-control-input-content {
    height: 100% !important;
  }
`;
const FullHeightFormItemUpload = styled(FullHeightFormItem)`
  .ant-upload-picture-card-wrapper,
  .ant-form-item-control-input,
  .ant-upload-list-picture-card,
  .ant-upload,
  .ant-upload-list-picture-card-container,
  .ant-upload-list-item,
  .ant-upload-list-item-removed,
  .ant-upload-list-item-list-type-picture-card {
    width: 100%;
    height: 100%;
    animation-duration: 0s;
  }
  .ant-upload-animate-inline-appear,
  .ant-upload-list-item-removed,
  .ant-upload-list-picture-card-container.ant-upload-animate-inline {
    display: none;
  }
`;

const selectAfter = (
  <Select defaultValue="month" className="select-after">
    <Select.Option value="year">year</Select.Option>
    <Select.Option value="month">month</Select.Option>
    <Select.Option value="day">day</Select.Option>
    <Select.Option value="week">week</Select.Option>
    <Select.Option value="hour">hour</Select.Option>
  </Select>
);

export default function CourseForm({
  afterSuccess,
  course,
}: {
  afterSuccess?: (course: Course) => void;
  course: Course | null;
}) {
  const [unit, setUnit] = useState<number>(2);

  const [form] = Form.useForm();
  const [teacherId, setTeacherId] = useState<number>();
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);

  const onFinish = async (values: any) => {
    const startTime = values.startTime.format('YYYY-MM-DD');
    const params = {
      ...values,
      startTime,
      teacherId,
      durationUnit: unit,
    };
    //console.log(params);
    const res: any = course
      ? await updateCourse({ ...params, id: course.id })
      : await addCourse(params);
    if (res.data) {
      afterSuccess && afterSuccess(res.data);
    }
  };

  const genCode = useCallback(async () => {
    const { data } = await getCourseCode();
    form.setFieldsValue({ uid: data });
  }, [form]);

  useEffect(() => {
    if (!course) {
      getCourseType().then((res: any) => {
        if (res.data) {
          setCourseTypes(res.data);
        }
      });
      afterSuccess && genCode();
    }
  }, [afterSuccess, course, genCode]);

  return (
    <Form
      layout="vertical"
      name="add_course"
      form={form}
      validateMessages={ValidateMessages}
      autoComplete="off"
      onFinish={onFinish}
      style={{ height: '100%' }}
    >
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
              {/* <Form.Item label="Teacher" name="teacherId" rules={[{ required: true }]}>
                <Select placeholder="Select teacher"></Select>
              </Form.Item> */}

              <Form.Item label="Teacher" name="teacherId" rules={[{ required: true }]}>
                <DebouncedSearchSelect
                  placeholder="search and select teacher"
                  fetchOptions={(teacherName: string): Promise<OptionValue[]> => {
                    return getTeachers({ query: teacherName }).then((res: any) => {
                      return res.data
                        ? res.data.teachers.map((teacher: { name: any; id: any }) => ({
                            label: teacher.name,
                            value: teacher.id,
                          }))
                        : [];
                    });
                  }}
                  onChange={(value) => setTeacherId(value)}
                />
              </Form.Item>
            </Col>

            <Col span={7} offset={1}>
              <Form.Item label="Type" name="type">
                {/* <Select mode="multiple"></Select> */}
                <Select mode="multiple" placeholder="select course types">
                  {courseTypes.map((courseType) => (
                    <Select.Option key={courseType.id} value={courseType.id}>
                      {courseType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={7} offset={1}>
              <Form.Item label="Course Code" name="uid" rules={[{ required: true }]}>
                <Input disabled type="text" placeholder="course code" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className={styles.box3}>
          <Form.Item label="Start Date" name="startTime">
            <DatePicker disabledDate={disabledDate} style={{ width: '100%' }} />
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
            <InputNumber min={1} addonAfter={selectAfter} style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <div className={styles.box4}>
          <Row style={{ height: '100%' }}>
            <Col span={11} offset={1} style={{ display: 'flex' }}>
              <FullHeightFormItem
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
                <Input.TextArea placeholder="Course description" style={{ height: '100%' }} />
              </FullHeightFormItem>
            </Col>

            <Col span={11} offset={1} style={{ display: 'flex' }}>
              <FullHeightFormItemUpload label="Cover" name="cover">
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
              </FullHeightFormItemUpload>
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
}
