import { Button, Result, Steps } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CourseForm from 'components/course/CourseForm';
import CourseSchedule from 'components/course/CourseSchedule';
import { Course } from 'model/course';

const { Step } = Steps;

const AddCourse: NextPage = () => {
  const [step, setStep] = useState(0);
  const [minAvailableStep, setMinAvailableStep] = useState(0);

  const [course, setCourse] = useState<Course | null>(null);

  return (
    <>
      <Steps current={step} type="navigation" onChange={(step) => setStep(step)}>
        <Step title="Course Detail" />
        <Step disabled={1 > minAvailableStep} title="Course Schedule" />
        <Step disabled={2 > minAvailableStep} title="Success" />
      </Steps>

      {(() => {
        switch (step) {
          case 0:
            return (
              <CourseForm
                course={course}
                afterSuccess={(course: Course) => {
                  setCourse(course);
                  setStep(1);
                  setMinAvailableStep(1);
                }}
              />
            );
          case 1:
            return <CourseSchedule />;
          case 2:
            return null;

          default:
            return null;
        }
      })()}
    </>
  );
};

export default AddCourse;
