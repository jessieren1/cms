import DashboardLayout from '../../../components/DashboardLayout';
import type { NextPage } from 'next';
import StudentSider from 'components/StudentSider';

const Manager: NextPage = () => {
  return <DashboardLayout left={<StudentSider />} center={<p>student page</p>} />;
};

export default Manager;
