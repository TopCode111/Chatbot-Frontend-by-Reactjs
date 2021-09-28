import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import { useMutation, useQueryClient } from "react-query";
import { useToastContext, ADD } from "../../store/ToastContext";
const axiosInstance = interceptor();

export function useDeleteMember() {
  const queryClient = useQueryClient();
  const { toastDispatch } = useToastContext();

  const res = useMutation(
    async (body) => {
      await axiosInstance
        .delete(`/api/lesson/${body}/delete-lesson`)
        .then(() => window.location.reload());
    },
    {
      onError: (error) => {
        try {
          const error = error.response.data;
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "失敗しました。" },
              type: "danger",
            },
          });
        } catch (e) {
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "失敗しました。" },
              type: "danger",
            },
          });
        }
      },
      onSuccess: (data) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: { sucess: "FAIL", message: "成功しました。" },
            type: "success",
          },
        });
      },
    }
  );
  return res;
}
