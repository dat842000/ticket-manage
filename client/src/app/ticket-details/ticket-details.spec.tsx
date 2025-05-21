import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TicketDetails } from "./ticket-details"; // Assuming named export
import { Ticket } from "@acme/shared-models"; // Import Ticket type

const mockNavigate = jest.fn();
const mockUseParams = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

const mockUseAppSelector = jest.fn();
jest.mock("client/src/redux/hooks", () => ({
  useAppSelector: (selector: any) => mockUseAppSelector(selector),
}));

jest.mock("client/src/redux/app/selectors", () => ({
  getTicket: jest.fn((state, id) => {
    if (id === 1) {
      return {
        id: 1,
        description: "This is a test description.",
        assigneeId: 1,
        completed: true,
      } as Ticket;
    }
    return undefined;
  }),
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

describe("TicketDetails", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseParams.mockClear();
    mockUseAppSelector.mockClear();
  });

  it("Render successfully with ticket details", () => {
    mockUseParams.mockReturnValue({ id: "101" });

    mockUseAppSelector.mockReturnValue({
      id: 1,
      description: "This is a test description.",
      assigneeId: 1,
      completed: true,
    });

    const { baseElement } = render(<TicketDetails />);
    expect(baseElement).toBeTruthy();

    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
    expect(screen.getByTestId("mock-assignee")).toBeInTheDocument();
    expect(screen.getByTestId("mock-status")).toBeInTheDocument();
    expect(screen.getByText("Mock Assignee for: User 1")).toBeInTheDocument();
    expect(screen.getByText("Mock Status for: Completed")).toBeInTheDocument();
  });

  it("Check back button", () => {
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseAppSelector.mockReturnValue({});

    render(<TicketDetails />);

    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("Ticket not exist case", () => {
    mockUseParams.mockReturnValue({ id: "abc" });
    mockUseAppSelector.mockReturnValue(undefined);
    const { baseElement } = render(<TicketDetails />);
    expect(baseElement).toBeTruthy();

    expect(screen.getByText("Ticket not exist")).toBeInTheDocument();
    expect(screen.queryByText("Description:")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-assignee")).not.toBeInTheDocument();
  });
});
