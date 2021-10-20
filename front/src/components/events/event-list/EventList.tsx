import { List } from "antd";
import React from "react";
import SingleEvent from "../single-event/SingleEvent";

type Props = {
  events: any[];
};

class EventList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <List
        size="small"
        pagination={{
          pageSize: 2,
        }}
        dataSource={this.props.events}
        renderItem={(item, index) => {
          const { date, email, firstName, lastName, eventName } = item;
          return (
            <SingleEvent
              date={new Date(date)}
              email={email}
              firstName={firstName}
              lastName={lastName}
              eventName={eventName}
              key={index}
            />
          );
        }}
      ></List>
    );
  }
}

export default EventList;
