import DashboardLayout from '../../../components/DashboardLayout';
import type { NextPage } from 'next';
import ManagerSider from 'components/Sider/ManagerSider';

const Manager: NextPage = () => {
  return <DashboardLayout left={<ManagerSider />} center={<p>manager page</p>} />;
};

export default Manager;
