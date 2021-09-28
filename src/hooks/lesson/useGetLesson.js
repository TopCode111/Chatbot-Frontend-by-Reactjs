import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import LocalStorageService from "../../utils/localStorageService";
const axiosInstance = interceptor();

export function useGetLesson() {
  const data = useQuery("lessons", () =>
    axiosInstance.get("/api/lesson/view-lesson").then((res) => res.data)
  );
  //   if (data?.data) {
  //     localStorageService.setCurrentUser(data?.data);
  //   }
  return data;
}
