import { Button, DatePicker, Form, Input, Modal } from "antd";
import React from "react";

type State = {};

type Props = {
  newEventSending: boolean;
  isModalVisible: boolean;
  onModalOk: any;
  onModalCancel: any;
  onFinish: any;
};

class NewEventModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Modal
        title="New Event"
        visible={this.props?.isModalVisible}
        onOk={this.props?.onModalOk}
        onCancel={this.props?.onModalCancel}
        footer={null}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={this.props?.onFinish}
        >
          <Form.Item label="Event Name:" name={["eventName"]}>
            <Input type="text" placeholder="Event name"></Input>
          </Form.Item>
          <Form.Item
            label="First Name:"
            name={["firstName"]}
            required
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input type="text" placeholder="First name" required></Input>
          </Form.Item>
          <Form.Item
            label="Last Name:"
            name={["lastName"]}
            required
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input type="text" placeholder="Last name" required></Input>
          </Form.Item>
          <Form.Item
            label="Email:"
            name={["email"]}
            required
            rules={[
              {
                required: true,
                message: "Please input valid email!",
                type: "email",
              },
            ]}
          >
            <Input type="text" placeholder="Email" required></Input>
          </Form.Item>

          <Form.Item
            label="Date and Time:"
            name={["date"]}
            required
            rules={[{ required: true, message: "Please input date!" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props?.newEventSending}
            >
              Create New Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default NewEventModal;
