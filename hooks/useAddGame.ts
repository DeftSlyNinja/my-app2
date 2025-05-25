import { VideoGame } from "@/components/ui/games-context-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type SupabaseNewGame = Omit<VideoGame, "id">;

export const useAddGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newGame: SupabaseNewGame) => {
      const { data, error } = await supabase.from("games").insert(newGame);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};
