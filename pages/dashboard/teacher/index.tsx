import DashboardLayout from '../../../components/DashboardLayout';
import type { NextPage } from 'next';
import TeacherSider from 'components/TeacherSider';

const Manager: NextPage = () => {
  return <DashboardLayout left={<TeacherSider />} center={<p>teacher page</p>} />;
};

export default Manager;
