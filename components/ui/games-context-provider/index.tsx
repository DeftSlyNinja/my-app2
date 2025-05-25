import { SupabaseNewGame, useAddGame } from "@/hooks/useAddGame";
import { useDeleteGame } from "@/hooks/useDeleteGame";
import { useUpdateGame } from "@/hooks/useUpdateGame";
import { useGetGames } from "@/hooks/useGetGames";
import { createContext, useState, useContext, useEffect } from "react";
// import videoGameData from '@/data/videogames.json';

export type VideoGame = {
  id: string;
  title: string;
  genre: string;
  completed: boolean;
};

type VideoGameContextType = {
  isLoading: boolean;
  videoGames: VideoGame[];
  addVideoGame: (videoGame: SupabaseNewGame) => void;
  updateVideoGame: (updatedVideoGame: Partial<VideoGame>) => void;
  toggleCompletion: (id: string) => void;
  deleteVideoGame: (id: string) => void;
};

const VideoGameContext = createContext<VideoGameContextType | undefined>(
  undefined,
);

export const VideoGameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isFetching } = useGetGames();
  const addVideoGameMutation = useAddGame();
  const deleteVideoGameMutation = useDeleteGame();
  const updateVideoGameMutation = useUpdateGame();

  const [videoGames, setVideoGames] = useState<VideoGame[]>([]);

  const addVideoGame = async (videoGame: SupabaseNewGame) => {
    addVideoGameMutation.mutate(videoGame);
  };

  const deleteVideoGame = async (gameId: VideoGame["id"]) => {
    deleteVideoGameMutation.mutate(gameId);
  };

  const updateVideoGame = (updatedVideoGame: Partial<VideoGame>) => {
    updateVideoGameMutation.mutate(updatedVideoGame);
  };

  const toggleCompletion = (id: string) => {
    const gameToToggle = videoGames.find((game) => game.id === id);
    if (!gameToToggle) return;
    updateVideoGame({ ...gameToToggle, completed: !gameToToggle.completed });
  };

  useEffect(() => {
    if (data && !isFetching) {
      console.log("Fetched data: ", data);
      setVideoGames(data as VideoGame[]);
    }
    if (isFetching) {
      console.log("Fetching data...");
    }
  }, [data, isFetching]);

  return (
    <VideoGameContext.Provider
      value={{
        isLoading: isFetching,
        videoGames,
        addVideoGame,
        updateVideoGame,
        toggleCompletion,
        deleteVideoGame,
      }}
    >
      {children}
    </VideoGameContext.Provider>
  );
};

export const useVideoGameContext = () => {
  const context = useContext(VideoGameContext);
  if (!context) {
    throw new Error(
      "useVideoGameContext must be used within a VideoGameProvider",
    );
  }
  return context;
};
