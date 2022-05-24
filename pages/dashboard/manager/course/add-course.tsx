import { Button, Result, Steps } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const { Step } = Steps;

const AddCourse: NextPage = () => {
  const [step, setStep] = useState(0);
  const [availableNavigate, setAvailableNavigate] = useState<number[]>([0]);

  return (
    <>
      <Steps
        current={step}
        type="navigation"
        onChange={(current) => {
          if (availableNavigate.includes(current)) {
            setStep(current);
          }
        }}
        style={{ padding: '1em 1.6%', margin: '20px 0' }}
      >
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>

      {/* {steps.map((content, index) => (
        <div key={index} style={{ display: index === step ? 'block' : 'none' }}>
          {content}
        </div>
      ))} */}
    </>
  );
};

export default AddCourse;
