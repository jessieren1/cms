import React from 'react';
import 'antd/dist/antd.css';
import { Table, Switch } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'No.',
    width: 100,
    dataIndex: 'no',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Area',
    dataIndex: 'area',
    key: '1',
    width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: '2',
    width: 150,
  },
  {
    title: 'Selected Curriculum',
    dataIndex: 'selected_curriculum',
    key: '3',
    width: 150,
  },
  {
    title: 'Student Type',
    dataIndex: 'student_type',
    key: '4',
    width: 150,
  },
  {
    title: 'Join Time',
    dataIndex: 'join_time',
    key: '5',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

function LoadStudentList() {
  const [data, setData] = React.useState([]);

  //probelm 1 : how to get browser data at here?
  //const token = localStorage.getItem('token');

  axios
    .get('http://cms.chtoma.com/api/students', {
      params: {
        page: 1,
        limit: 200,
      },
      headers: {
        Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjUwNTQ2MDQ1LCJleHAiOjE2NTgzMjIwNDV9.kOT1pkL0nNAKH_1Re34p7VVz_CKWtsZDmSAhTFGHGYY`,
      },
    })
    //problem 2, too many request 429?
    .then((res) => {
      setData(res.data.data.students);
    })
    .catch((error) => {
      console.log(error);
    });

  const [fixedTop, setFixedTop] = React.useState(false);

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1500 }}
      summary={(pageData) => (
        <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              <Switch
                checkedChildren="Fixed Top"
                unCheckedChildren="Fixed Top"
                checked={fixedTop}
                onChange={() => {
                  setFixedTop(!fixedTop);
                }}
              />
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} colSpan={8}>
              Scroll Context
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      sticky
    />
  );
}

export default LoadStudentList;
