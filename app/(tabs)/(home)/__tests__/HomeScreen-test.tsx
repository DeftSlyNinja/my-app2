import { fireEvent, render, screen } from "@/utils/test-utils";
import HomeScreen from "..";
import mockData from "../../../../data/videogames.json";
import { useGetGames } from "@/hooks/useGetGames";

// Mock the useGetGames hook
jest.mock("@/hooks/useGetGames", () => ({
  useGetGames: jest.fn(),
}));

describe("HomeScreen", () => {
  beforeEach(() => {
    (useGetGames as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Smaller sample since my data size is large
  const initialGames = mockData.slice(0, 5);

  test("Renders heading and search input", () => {
    render(<HomeScreen />);

    expect(
      screen.getByRole("header", { name: /my game library/i }),
    ).toBeTruthy();

    expect(
      screen.getByPlaceholderText(/search game library.../i),
    ).toBeOnTheScreen();
  });

  test("Renders game data and filters by search", () => {
    render(<HomeScreen />);
    render(<HomeScreen />);

    // Checks if first 5 games are rendered
    initialGames.forEach((game) => {
      expect(screen.getByText(game.title)).toBeOnTheScreen();
    });

    // Simulate search query
    const mockQuery = "zelda";
    fireEvent.changeText(
      screen.getByPlaceholderText(/search game library.../i),
      mockQuery,
    );

    // Check for filtered games
    mockData.forEach((game) => {
      if (game.title.toLowerCase().includes(mockQuery)) {
        expect(screen.getByText(game.title)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(game.title)).not.toBeOnTheScreen();
      }
    });
  });

  test("Renders updated games with filtering", async () => {
    const mockQuery = "on";
    render(<HomeScreen />);

    initialGames.forEach((game) => {
      expect(screen.getByText(game.title)).toBeOnTheScreen();
    });

    fireEvent.changeText(
      screen.getByPlaceholderText(/search game library.../i),
      mockQuery,
    );

    mockData.forEach((game) => {
      if (game.title.toLowerCase().includes(mockQuery)) {
        expect(screen.getByText(game.title)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(game.title)).not.toBeOnTheScreen();
      }
    });

    (useGetGames as jest.Mock).mockReturnValue({
      data: mockData.splice(1, 1),
      isFetching: false,
    });

    mockData.forEach((game) => {
      if (game.title.toLowerCase().includes(mockQuery)) {
        expect(screen.getByText(game.title)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(game.title)).not.toBeOnTheScreen();
      }
    });
  });
});
