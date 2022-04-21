import DashboardLayout from '../../../../components/DashboardLayout';
import type { NextPage } from 'next';
import ManagerSider from 'components/ManagerSider';
import LoadStudentList from 'components/LoadStudentList';

const StudentList: NextPage = () => {
  return <DashboardLayout left={<ManagerSider />} center={<LoadStudentList />} />;
};

export default StudentList;
