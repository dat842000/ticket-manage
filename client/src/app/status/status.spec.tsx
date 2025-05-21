import { render, screen } from "@testing-library/react";
import Status from "./status";

const mockDispatch = jest.fn();
jest.mock("client/src/redux/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

describe("Status", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("should render successfully when currentTicket is provided", () => {
    const mockTicket = {
      id: 1,
      description: "This is a test description.",
      assigneeId: 1,
      completed: true,
    };

    const { baseElement } = render(<Status currentTicket={mockTicket} />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("should render todo", () => {
    const mockTicket = {
      id: 1,
      description: "This is a test description.",
      assigneeId: 1,
      completed: false,
    };

    const { baseElement } = render(<Status currentTicket={mockTicket} />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("To do")).toBeInTheDocument();
  });

  it("should not render when dont have param", () => {
    const { container } = render(<Status />);
    expect(container).toBeNull;
  });
});
