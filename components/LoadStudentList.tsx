import React from 'react';
import 'antd/dist/antd.css';
import { Table, Switch } from 'antd';
import axios from 'axios';

//how to calculate time?
//how to get type -> type.name?
//courses ?
// re-construct a new obj?
const currentTime = new Date().toLocaleString(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
  second: '2-digit',
});

const columns = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Area',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Selected Curriculum',
    dataIndex: 'selected_curriculum',
    key: 'selected_curriculum',
  },
  {
    title: 'Student Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Join Time',
    dataIndex: 'join_time',
    key: 'join_time',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <>
        <a>Edit </a>
        <a>Delete</a>
      </>
    ),
  },
];

function LoadStudentList() {
  const [data, setData] = React.useState([]);

  //probelm 1 : how to get browser data at here?
  //const token = localStorage.getItem('token');

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     axios
  //       .get('http://cms.chtoma.com/api/students', {
  //         params: {
  //           page: 1,
  //           limit: 200,
  //         },
  //         headers: {
  //           Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjUwNTQ2MDQ1LCJleHAiOjE2NTgzMjIwNDV9.kOT1pkL0nNAKH_1Re34p7VVz_CKWtsZDmSAhTFGHGYY`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         setData(res.data.data.students);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  // }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://cms.chtoma.com/api/students', {
        params: {
          page: 1,
          limit: 300,
        },
        headers: {
          Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjUwNTQ2MDQ1LCJleHAiOjE2NTgzMjIwNDV9.kOT1pkL0nNAKH_1Re34p7VVz_CKWtsZDmSAhTFGHGYY`,
        },
      });
      console.log(data);
      setData(result.data.data.students);
    };

    //how to deal with error?
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <Table columns={columns} dataSource={data} sticky />;
}

export default LoadStudentList;
