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

  const router = useRouter();

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
            return (
              <CourseSchedule
                course={course}
                afterSuccess={() => {
                  setStep(2);
                  setMinAvailableStep(2);
                }}
              />
            );
          case 2:
            return (
              <Result
                status="success"
                title="Successfully Create Course!"
                extra={[
                  <Button
                    type="primary"
                    key="detail"
                    onClick={() => router.push(`/dashboard/manager/courses/${course?.id}`)}
                  >
                    Go Course
                  </Button>,
                  <Button
                    key="again"
                    onClick={() => {
                      setStep(0);
                      setMinAvailableStep(0);
                      setCourse(null);
                    }}
                  >
                    Create Again
                  </Button>,
                ]}
              />
            );

          default:
            return null;
        }
      })()}
    </>
  );
};

export default AddCourse;
