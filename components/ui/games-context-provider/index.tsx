import { createContext, useState, useContext } from 'react';
import videoGameData from '@/data/videogames.json';

export type VideoGame = {
    id: number;
    title: string;
    genre: string;
    completed: boolean;
}

type VideoGameContextType = {
    videoGames: VideoGame[];
    addVideoGame: (videoGame: VideoGame) => void;
    updateVideoGame: (id: number, updatedVideoGame: Partial<VideoGame>) => void;
    toggleCompletion: (id: number) => void;
    // Delete Video Game?
}

const VideoGameContext = createContext<VideoGameContextType | undefined>(undefined);

export const VideoGameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [videoGames, setVideoGames] = useState<VideoGame[]>(videoGameData as VideoGame[]);

    const addVideoGame = (videoGame: VideoGame) => {
        setVideoGames((prev) => [...prev, videoGame]);
    };

    const updateVideoGame = (id: number, updateVideoGame: Partial<VideoGame>) => {
        setVideoGames((prev) => 
            prev.map((videoGame) => 
                videoGame.id === id ? {...videoGame, ...updateVideoGame} : videoGame
            )
        );
    };

    const toggleCompletion = (id: number) => {
        setVideoGames((prev) =>
            prev.map((videoGame) =>
                videoGame.id === id ? {...videoGame, completed: !videoGame.completed} : videoGame
            )
        );
    };

    return (
        <VideoGameContext.Provider value={{ videoGames, addVideoGame, updateVideoGame, toggleCompletion }}>
            {children}
        </VideoGameContext.Provider>
    );
}

export const useVideoGameContext = () => {
    const context = useContext(VideoGameContext);
    if (!context) {
        throw new Error("useVideoGameContext must be used within a VideoGameProvider")
    }
    return context;
};