import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: any = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

function LoadStudentList() {
  //probelm 1 : how to get browser data at here?
  //const token = localStorage.getItem('token');

  axios
    .get('http://cms.chtoma.com/api/students', {
      params: {
        page: 20,
        limit: 1000,
      },
      headers: {
        Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjUwNTQ2MDQ1LCJleHAiOjE2NTgzMjIwNDV9.kOT1pkL0nNAKH_1Re34p7VVz_CKWtsZDmSAhTFGHGYY`,
      },
    })
    .then((res) => {
      //problem 2: get 200 res. however, where is the data of student list?
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  // problem 3: why TS always show red? same problem in breadcrumb
  function onSelectChange(selectedRowKeys) {
    setSelectedRowKeys({ selectedRowKeys });
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: { onSelectChange },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys({ selectedRowKeys: newSelectedRowKeys });
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys({ selectedRowKeys: newSelectedRowKeys });
        },
      },
    ],
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
}

export default LoadStudentList;
