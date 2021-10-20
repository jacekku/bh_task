import "./SingleEvent.css";

import React from "react";
import { Card } from "antd";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
  eventName: string;
};

class SingleEvent extends React.Component<Props> {
  readonly UNNAMED_EVENT = "Unnamed Event";

  render() {
    return (
      <Card title={this.props.eventName || this.UNNAMED_EVENT}>
        <p>
          {this.props.firstName} {this.props.lastName}
        </p>
        <p>email: {this.props.email}</p>
        <p>{this.props.date.toLocaleString()}</p>
      </Card>
    );
  }
}

export default SingleEvent;
