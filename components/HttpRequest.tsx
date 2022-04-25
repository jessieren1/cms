import Cryptojs from 'crypto-js';
import axios from 'axios';
import { useRouter } from 'next/router';

function Login(values: any) {
  const router = useRouter();
  const email = values.email;
  const password = Cryptojs.AES.encrypt(values.password, 'cms').toString();
  const role = values.role.toLowerCase();

  axios
    .post('http://cms.chtoma.com/api/login', {
      email: email,
      password: password,
      role: role,
    })
    .then((res) => {
      const resRole = res.data.data.role;
      const resToken = res.data.data.token;
      localStorage.setItem('role', resRole);
      localStorage.setItem('token', resToken);

      router.push({
        pathname: '/dashboard/' + role,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export { Login };
