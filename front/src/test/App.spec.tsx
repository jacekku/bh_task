/**
 * @jest-environment jsdom
 */
import "./jest/__mocks__/watchMedia.mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "../App";

let container: HTMLDivElement;

beforeAll(() => {
  global.fetch = jest
    .fn()
    .mockImplementation(
      (input: RequestInfo, init?: RequestInit | undefined) => {
        return Promise.resolve({ json: () => Promise.resolve([]) } as any);
      }
    );
});

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

describe("App", () => {
  test("renders App component", () => {
    render(<App></App>, container);
  });
});
