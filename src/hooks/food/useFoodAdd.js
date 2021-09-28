import { useMutation, useQueryClient } from "react-query";
import { interceptor } from "../../utils/interceptor";
import { useToastContext, ADD } from "../../store/ToastContext";

const axiosInstance = interceptor();

export default function useFoodAdd() {
  const { toastDispatch } = useToastContext();
  const queryClient = useQueryClient();

  const res = useMutation(
    (body) => {
      return axiosInstance
        .post("/api/food/add-food", { ...body })
        .then((res) => res.data);
    },
    {
      onError: (error) => {
        try {
          const error = error.response.data;
          toastDispatch({
            type: ADD,
            payload: {
              content: { success: "FAIL", message: error },
              type: "danger",
            },
          });
        } catch (e) {
          toastDispatch({
            type: ADD,
            payload: {
              content: { success: "FAIL", message: "何かの間違いだ" },
              type: "danger",
            },
          });
        }
      },
      onSuccess: (data) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: { success: "FAIL", message: "成功しました。" },
            type: "success",
          },
        });
      },
    }
  );
  return res;
}
