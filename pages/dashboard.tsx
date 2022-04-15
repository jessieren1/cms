import { useRouter } from 'next/router';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const { email, password, role } = router.query;
  console.log(password);

  axios
    .post('http://cms.chtoma.com/api/login', {
      email: email,
      password: password,
      role: role,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return <div>Dashboard page</div>;
}
