import DashboardLayout from '../../components/DashboardLayout';
import type { NextPage } from 'next';
import StudentSider from 'components/StudentSider';

const Student: NextPage = () => {
  return <DashboardLayout left={<StudentSider />} center={<p>Student page</p>} />;
};

export default Student;
