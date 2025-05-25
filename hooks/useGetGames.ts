import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useGetGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const { data, error } = await supabase.from("games").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
