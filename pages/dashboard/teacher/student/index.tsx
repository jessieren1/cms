import DashboardLayout from '../../../../components/DashboardLayout';
import type { NextPage } from 'next';
import TeacherSider from 'components/TeacherSider';
import LoadStudentList from 'components/LoadStudentList';

const StudentList: NextPage = () => {
  return <DashboardLayout left={<TeacherSider />} center={<LoadStudentList />} />;
};

export default StudentList;
