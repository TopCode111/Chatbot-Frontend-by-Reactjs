import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import LocalStorageService from "../../utils/localStorageService";
const localStorageService = LocalStorageService.getService();
const axiosInstance = interceptor();

export function useCurrentUser() {
  const data = useQuery("currentuser", () =>
    axiosInstance.get("/api/user/details/").then((res) => res.data)
  );
  if (data?.data) {
    localStorageService.setCurrentUser(data?.data);
  }
  return data;
}
