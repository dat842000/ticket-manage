import { render, screen } from "@testing-library/react";
import TicketRow from "./ticket-row";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children, className }) => (
    <div data-testid="mock-link" data-to={to} className={className}>
      {children}
    </div>
  )),
}));

jest.mock("../assignee/assignee", () => ({
  __esModule: true,
  default: jest.fn(({ currentTicket }) => (
    <div data-testid="mock-assignee">
      Mock Assignee for:{" "}
      {currentTicket?.assigneeId
        ? `User ${currentTicket.assigneeId}`
        : "Unassigned"}
    </div>
  )),
}));

jest.mock("../status/status", () => ({
  __esModule: true,
  default: jest.fn(({ currentTicket }) => (
    <div data-testid="mock-status">
      Mock Status for: {currentTicket?.completed ? "Completed" : "To do"}
    </div>
  )),
}));

describe("Ticket", () => {
  it("should render successfully", () => {
    const mockTicket = {
      id: 101,
      description: "This is a test description.",
      assigneeId: 1,
      completed: true,
    };
    const { baseElement } = render(<TicketRow ticket={mockTicket} />);
    expect(baseElement).toBeTruthy();
    expect(
      screen.getByText("101-This is a test description.")
    ).toBeInTheDocument();

    const mockLink = screen.getByTestId("mock-link");
    expect(mockLink).toBeInTheDocument();
    expect(mockLink).toHaveAttribute("data-to", `/${mockTicket.id}`);
  });
});
