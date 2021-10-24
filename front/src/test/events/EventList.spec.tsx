/**
 * @jest-environment jsdom
 */
import "../jest/__mocks__/watchMedia.mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import EventList from "../../components/events/event-list/EventList";

let container: HTMLDivElement;

const TEST_EVENTS = [
  {
    eventName: "Event 1",
    firstName: "name 1",
    lastName: "surname 1",
    email: "email1",
    date: new Date(),
  },
  {
    eventName: "Event 2",
    firstName: "name 2",
    lastName: "surname 2",
    email: "email 2",
    date: new Date(),
  },
];

const ANT_CARD_BODY = ".ant-card-body";
const ANT_CARD_TITLE = ".ant-card-head-title";

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null as any;
});

describe("EventList", () => {
  test("renders EventList component properly", () => {
    render(<EventList events={TEST_EVENTS}></EventList>, container);
    const cardTitles = container.querySelectorAll(ANT_CARD_TITLE);
    const cardBodies = container.querySelectorAll(ANT_CARD_BODY);
    expect(cardTitles).toHaveLength(2);
    expect(cardBodies).toHaveLength(2);

    expect(cardTitles[0].textContent).toBe(TEST_EVENTS[0].eventName);
    expect(cardTitles[1].textContent).toBe(TEST_EVENTS[1].eventName);

    expect(cardBodies[0].textContent).toContain(
      TEST_EVENTS[0].date.toLocaleString()
    );
    expect(cardBodies[0].textContent).toContain(TEST_EVENTS[0].email);
    expect(cardBodies[0].textContent).toContain(TEST_EVENTS[0].firstName);
    expect(cardBodies[0].textContent).toContain(TEST_EVENTS[0].lastName);

    expect(cardBodies[0].textContent).not.toContain(TEST_EVENTS[1].email);
    expect(cardBodies[0].textContent).not.toContain(TEST_EVENTS[1].firstName);
    expect(cardBodies[0].textContent).not.toContain(TEST_EVENTS[1].lastName);
  });
});
