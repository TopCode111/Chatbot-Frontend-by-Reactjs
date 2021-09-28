/* eslint-disable no-unused-vars */
import { interceptor } from "../../utils/interceptor";
import { useToastContext, ADD } from "../../store/ToastContext";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import LocalStorageService from "../../utils/localStorageService";
import { useUserContext } from "../../store/UserContext";
const localStorageService = LocalStorageService.getService();
const axiosInstance = interceptor();

export default function useLogin(endPoint) {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { toastDispatch } = useToastContext();
  const { setAuthData } = useUserContext();

  const res = useMutation(
    (body) => {
      return axiosInstance
        .post("/api/login", { ...body, csrftoken: "aRlOF7MyMG8CG4NZT8FMCnaRa0st2jl0ghfrTIznrZ1PxgJ9rLgRpFji1nJkO5jk" })
        .then((res) => res.data);
    },
    {
      onError: (error) => {
        try {
          const error = error.response.data;
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: error },
              type: "danger",
            },
          });
        } catch (e) {
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "何かの間違いだ" },
              type: "danger",
            },
          });
        }
      },
      onSuccess: (data) => {
        localStorageService.setToken(data?.access);
        setAuthData({token: data?.access})
        history.push("/");
        // setTimeout(function () {
        //   window.location.reload();
        // }, 500);
      },
    }
  );
  return res;
}
