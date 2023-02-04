import { NotificationFilled } from '@ant-design/icons';
import { Calendar, Card, Descriptions, Modal, Tag, Tooltip } from 'antd';
import type { NextPage } from 'next';
import Head from 'next/head';

const Schedule: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'CMS DashBoard: Student-Schedule'}</title>
      </Head>
      <div>
        <Card title="Class Schedule">
          <Calendar />
        </Card>

        <Modal title="Class Info">
          <Descriptions>
            <Descriptions.Item span={3} label="Class Name">
              x
            </Descriptions.Item>

            <Descriptions.Item span={3} label="Class Type">
              <Tag></Tag>
            </Descriptions.Item>

            <Descriptions.Item span={3} label="Teacher Name">
              x
            </Descriptions.Item>

            <Descriptions.Item span={3} label="Class Time">
              <Tooltip title="Remind Me">
                <NotificationFilled
                  style={{
                    color: '#1890ff',
                    marginLeft: 10,
                    cursor: 'pointer',
                  }}
                  onClick={() => {}}
                />
              </Tooltip>
            </Descriptions.Item>

            <>
              <Descriptions.Item span={3} label="Chapter No.">
                x
              </Descriptions.Item>

              <Descriptions.Item span={3} label="Chapter Name">
                x
              </Descriptions.Item>

              <Descriptions.Item span={3} label="Chapter Content">
                x
              </Descriptions.Item>
            </>
          </Descriptions>
        </Modal>
      </div>
    </>
  );
};

export default Schedule;
