import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("renders Markdown → HTML Converter", () => {
  render(<App />);
  const linkElement = screen.getByText(/Markdown → HTML Converter/i);
  expect(linkElement).to.exist;
});
