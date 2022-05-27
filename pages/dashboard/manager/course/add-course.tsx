import { Button, Result, Steps } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CourseForm from 'components/course/CourseForm';
import CourseSchedule from 'components/course/CourseSchedule';

const { Step } = Steps;

const AddCourse: NextPage = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      <Steps current={step} type="navigation" onChange={(step) => setStep(step)}>
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>

      {(() => {
        switch (step) {
          case 0:
            return <CourseForm />;
          case 1:
            return <CourseSchedule />;
          case 3:
            return null;

          default:
            return null;
        }
      })()}
    </>
  );
};

export default AddCourse;
