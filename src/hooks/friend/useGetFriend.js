import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import LocalStorageService from "../../utils/localStorageService";
const axiosInstance = interceptor();

export function useGetFriend() {
  const data = useQuery("friends", () =>
    axiosInstance.get("/api/friend/view-friend").then((res) => res.data)
  );
  //   if (data?.data) {
  //     localStorageService.setCurrentUser(data?.data);
  //   }
  return data;
}
