import { Select, Form, Input } from 'antd';

export function AddStudentForm(props: any) {
  const { form, handleSubmit } = props;
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      layout="horizontal"
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="country" label="Area" rules={[{ required: true }]}>
        <Select allowClear>
          <Select.Option value="china">China</Select.Option>
          <Select.Option value="new_zealand">New Zealand</Select.Option>
          <Select.Option value="canada">Canada</Select.Option>
          <Select.Option value="australia">Australia</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="type" label="Student Type" rules={[{ required: true }]}>
        <Select allowClear>
          <Select.Option value="tester">Tester</Select.Option>
          <Select.Option value="developer">Developer</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}
