/* eslint-disable no-unused-vars */
import { interceptor } from "../../utils/interceptor";
import { useToastContext, ADD } from "../../store/ToastContext";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import LocalStorageService from "../../utils/localStorageService";
const localStorageService = LocalStorageService.getService();
const axiosInstance = interceptor();

export default function useResetPassword() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { toastDispatch } = useToastContext();

  const res = useMutation(
    (body) => {
      return axiosInstance
        .post("/api/reset", { ...body })
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
        history.push("/login");
      },
    }
  );
  return res;
}
