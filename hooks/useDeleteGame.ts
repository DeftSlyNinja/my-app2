import { VideoGame } from "@/components/ui/games-context-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGame = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (gameId: VideoGame['id']) => {
            const { data, error } = await supabase
                .from('games')
                .delete()
                .eq('id', gameId);
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