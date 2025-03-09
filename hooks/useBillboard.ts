import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSwr("/api/random", fetcher, {
    revalidateIfStale: false, //his option disables automatic revalidation when the data is stale. In other words, if the data is considered outdated (because it was fetched a while ago), SWR won't automatically fetch the updated data. Instead, it will keep showing the stale data until something triggers a revalidation
    revalidateOnFocus: false, //This option disables automatic revalidation when the user focuses on the page (i.e., when the tab becomes active). Normally, SWR would revalidate the data when this happens to ensure that the displayed data is up-to-date. However, setting this option to false turns off this behavior
    revalidateOnReconnect: false, //This option disables automatic revalidation when the browser regains a network connection. Like the previous options, this means that SWR won't automatically fetch the updated data when the internet connection is restored
  });
  return {
    data,
    error,
    isLoading,
  };
};

export default useBillboard;
