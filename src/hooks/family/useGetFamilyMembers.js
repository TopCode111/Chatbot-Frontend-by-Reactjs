import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import LocalStorageService from "../../utils/localStorageService";
const axiosInstance = interceptor();

export function useGetFamilyMembers() {
  const data = useQuery("familymembers", () =>
    axiosInstance.get("/api/family/member-view").then((res) => res.data)
  );
  //   if (data?.data) {
  //     localStorageService.setCurrentUser(data?.data);
  //   }
  return data;
}
