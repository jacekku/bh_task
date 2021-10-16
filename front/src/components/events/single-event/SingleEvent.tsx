import "./SingleEvent.css";

import React from "react";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
};

class SingleEvent extends React.Component<Props> {
  render() {
    return (
      <div className="SingleEvent">
        <p>
          {this.props.firstName} {this.props.lastName}
        </p>

        <p>email: {this.props.email}</p>
        <p>{this.props.date.toLocaleString()}</p>
      </div>
    );
  }
}

export default SingleEvent;
