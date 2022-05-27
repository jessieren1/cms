import { Button, Result, Steps } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CourseForm from 'components/course/CourseForm';

const { Step } = Steps;

const AddCourse: NextPage = () => {
  const [step, setStep] = useState(0);
  const [availableNavigate, setAvailableNavigate] = useState<number[]>([0]);

  return (
    <>
      <Steps current={step} type="navigation">
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>

      <div style={{ display: step === 0 ? 'block' : 'none' }}>
        <CourseForm />
      </div>
    </>
  );
};

export default AddCourse;
