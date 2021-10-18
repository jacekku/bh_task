import { Button, DatePicker, Form, Input, Modal } from "antd";
import React, { ChangeEvent } from "react";
import "./EventsContainer.css";
import SingleEvent from "./single-event/SingleEvent";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  events: any[];
  isModalVisible: boolean;
  newEventSending: boolean;
};

type Props = {};

class EventsContainer extends React.Component<Props, State> {
  readonly GET_URL = "http://localhost:3001/events/@email";
  readonly POST_URL = "http://localhost:3001/events/create";
  timer!: NodeJS.Timeout;
  WAIT_TIMEOUT: number = 500;

  render() {
    return (
      <div className="EventsContainer">
        <Input
          type="text"
          onChange={this.searchText.bind(this)}
          placeholder="search"
        ></Input>
        <Button onClick={this.search.bind(this)}>search</Button>
        {this.state?.events?.map((event) => {
          const { date, email, firstName, lastName } = event;
          return (
            <SingleEvent
              date={new Date(date)}
              email={email}
              firstName={firstName}
              lastName={lastName}
              key={date}
            />
          );
        })}
        <Modal
          title="New Event"
          visible={this.state?.isModalVisible}
          onOk={this.onModalOk.bind(this)}
          onCancel={this.onModalCancel.bind(this)}
          footer={null}
        >
          <Form
            initialValues={{ remember: true }}
            onFinish={this.onFinish.bind(this)}
          >
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
                loading={this.state?.newEventSending}
              >
                Create New Event
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Button type="primary" color="#0f0" onClick={this.showModal.bind(this)}>
          Add New Event
        </Button>
      </div>
    );
  }

  onFinish(values: any) {
    const { firstName, lastName, date, email } = values;
    this.setState({
      newEventSending: true,
    });
    fetch(this.POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, date, email }),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            newEventSending: false,
            isModalVisible: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          newEventSending: false,
        });
      });
  }

  searchText(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(this.timer);
    this.setState({
      email: event.target.value,
    });
    this.timer = setTimeout(this.search.bind(this), this.WAIT_TIMEOUT);
  }

  search() {
    console.log("sending");
    const url = this.GET_URL.replace("@email", this.state.email);
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        if (data.length == 0 || data.statusCode) return;
        this.setState({ events: data });
      })
      .catch((e) => console.error(e));
  }

  onModalCancel() {
    this.setState({ isModalVisible: false });
  }

  onModalOk() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }
}

export default EventsContainer;
