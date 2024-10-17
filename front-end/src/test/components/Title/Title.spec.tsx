import Home from "@/components/Title/Title";
import { render, screen } from "@testing-library/react";

test("renders Home component with loading text", () => {
  render(<Home path="test-path" />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
