import useSwr from "swr";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
    //TODO : how useswr works check it
  const { data, error, isLoading, mutate } = useSwr("/api/current", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;