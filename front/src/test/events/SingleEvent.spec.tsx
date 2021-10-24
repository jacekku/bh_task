/**
 * @jest-environment jsdom
 */
import "../jest/__mocks__/watchMedia.mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import SingleEvent from "../../components/events/single-event/SingleEvent";

let container: HTMLDivElement;

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

describe("SingleEvent", () => {
  test("renders SingleEvent component properly", () => {
    const date = new Date();
    render(
      <SingleEvent
        date={date}
        email="email@email.com"
        eventName="Event name"
        firstName="Test"
        lastName="TestLastName"
      ></SingleEvent>,
      container
    );
    expect(container.textContent).toContain("email@email.com");
    expect(container.textContent).toContain("Event name");
    expect(container.textContent).toContain("Test");
    expect(container.textContent).toContain("TestLastName");
    expect(container.textContent).toContain(date.toLocaleString());
  });
  test("renders SingleEvent with no eventName", () => {
    render(
      <SingleEvent
        date={new Date()}
        email="email@email.com"
        firstName="Test"
        lastName="Test"
      ></SingleEvent>,
      container
    );
    expect(container.textContent).toContain("Unnamed Event");
  });
});
