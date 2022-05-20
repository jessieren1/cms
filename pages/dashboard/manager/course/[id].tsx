import DashboardLayout from '../../../../components/DashboardLayout';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { getSingleCourse } from 'lib/services/course-api';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

function SingleCourse() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [info, setInfo] = useState<{ label: string; value: string | number }[]>([]);

  useEffect(() => {
    getSingleCourse({ id: id }).then((res: any) => {
      if (res.data) {
        setCourse(res.data);
        const sales = res.data.sales;
        const info = [
          { label: 'Price', value: sales.price },
          { label: 'Batches', value: sales.batches },
          { label: 'Students', value: sales.studentAmount },
          { label: 'Earings', value: sales.earnings },
        ];
        setInfo(info);
        console.log(info);
      }
    });
  }, [id]);

  return (
    <Layout>
      <p>course</p>
    </Layout>
  );
}

const SingleCoursePage: NextPage = () => {
  return <DashboardLayout>{<SingleCourse />}</DashboardLayout>;
};

export default SingleCoursePage;
