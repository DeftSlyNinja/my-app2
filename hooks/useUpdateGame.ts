import { VideoGame } from "@/components/ui/games-context-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateGame = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedGame: Partial<VideoGame>) => {
            const { data, error } = await supabase
                .from('games')
                .update(updatedGame)
                .eq('id', updatedGame.id);
            if (error) {
                throw new Error(error.message)
            }
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['games'] })
        },
    })
}