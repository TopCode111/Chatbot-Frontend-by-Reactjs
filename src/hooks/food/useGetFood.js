import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import LocalStorageService from "../../utils/localStorageService";
const axiosInstance = interceptor();

export function useGetFood() {
  const data = useQuery("food", () =>
    axiosInstance.get("/api/food/view-food").then((res) => res.data)
  );
  //   if (data?.data) {
  //     localStorageService.setCurrentUser(data?.data);
  //   }
  return data;
}
