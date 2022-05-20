import DashboardLayout from '../../../../components/DashboardLayout';
import type { NextPage } from 'next';
import LoadStudentList from 'components/LoadStudentList';

const StudentList: NextPage = () => {
  return <DashboardLayout>{<LoadStudentList />}</DashboardLayout>;
};

export default StudentList;
