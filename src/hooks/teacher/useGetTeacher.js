import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import LocalStorageService from "../../utils/localStorageService";
const axiosInstance = interceptor();

export function useGetTeacher() {
  const data = useQuery("Teachers", () =>
    axiosInstance.get("/api/teacher/view-teacher").then((res) => res.data)
  );
  //   if (data?.data) {
  //     localStorageService.setCurrentUser(data?.data);
  //   }
  return data;
}
