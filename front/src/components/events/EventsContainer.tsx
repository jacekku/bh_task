import { Button, Input } from "antd";
import React, { ChangeEvent } from "react";
import EventList from "./event-list/EventList";
import "./EventsContainer.css";
import NewEventModal from "./new-event-modal/NewEventModal";
import EventsApiService from "./services/ApiService";
import SingleEvent from "./single-event/SingleEvent";

type State = {
  events: any[];
  newEventSending: boolean;
  isModalVisible: boolean;
  searchQuery: string;
};

type Props = {};

class EventsContainer extends React.Component<Props, State> {
  timer!: NodeJS.Timeout;
  WAIT_TIMEOUT: number = 500;

  onModalCancel() {
    this.setState({ isModalVisible: false });
  }

  onModalOk() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    return (
      <div className="EventsContainer">
        <Input
          type="text"
          onChange={this.searchText.bind(this)}
          placeholder="search"
        ></Input>
        <NewEventModal
          newEventSending={this.state?.newEventSending}
          isModalVisible={this.state?.isModalVisible}
          onFinish={this.onFinish.bind(this)}
          onModalCancel={this.onModalCancel.bind(this)}
          onModalOk={this.onModalOk.bind(this)}
        ></NewEventModal>
        <Button type="primary" color="#0f0" onClick={this.showModal.bind(this)}>
          Add New Event
        </Button>
        <Button onClick={this.search.bind(this)}>search</Button>

        <EventList events={this.state?.events} />
      </div>
    );
  }

  onFinish(values: any) {
    const { firstName, lastName, date, email, eventName } = values;
    this.setState({
      newEventSending: true,
    });
    EventsApiService.createEvent({
      firstName,
      lastName,
      date,
      email,
      eventName,
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

  search() {
    EventsApiService.queryString(this.state.searchQuery)
      .then((data) => data.json())
      .then(this.setEvents.bind(this))
      .catch((e) => console.error(e));
  }

  componentDidMount() {
    EventsApiService.getAll()
      .then((data) => data.json())
      .then(this.setEvents.bind(this))
      .catch((e) => console.error(e));
  }

  searchText(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(this.timer);
    this.setState({
      searchQuery: event.target.value,
    });
    this.timer = setTimeout(this.search.bind(this), this.WAIT_TIMEOUT);
  }

  private setEvents(events: any[]) {
    this.setState({
      events: events.sort(
        (ev1: { date: string }, ev2: { date: string }) =>
          new Date(ev1.date).getTime() - new Date(ev2.date).getTime()
      ),
    });
  }
}

export default EventsContainer;
