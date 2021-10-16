import React, { ChangeEvent } from "react";
import "./EventsContainer.css";
import SingleEvent from "./single-event/SingleEvent";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  events: any[];
};

type Props = {};

class EventsContainer extends React.Component<Props, State> {
  readonly GET_URL = "http://localhost:3001/events/@email";
  timer!: NodeJS.Timeout;
  WAIT_TIMEOUT: number = 500;

  render() {
    return (
      <div className="EventsContainer">
        <input
          type="text"
          onChange={this.searchText.bind(this)}
          placeholder="search"
        ></input>
        <button onClick={this.search.bind(this)}>search</button>
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
      </div>
    );
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
}

export default EventsContainer;
