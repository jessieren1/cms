import DashboardLayout from '../../components/DashboardLayout';
import type { NextPage } from 'next';
import TeacherSider from 'components/TeacherSider';

const Teacher: NextPage = () => {
  return <DashboardLayout left={<TeacherSider />} center={<p>Teacher page</p>} />;
};

export default Teacher;
