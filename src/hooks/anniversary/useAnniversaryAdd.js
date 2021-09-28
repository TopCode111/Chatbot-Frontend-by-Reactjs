import { useMutation, useQueryClient } from "react-query";
import { interceptor } from "../../utils/interceptor";
import { useToastContext, ADD } from "../../store/ToastContext";

const axiosInstance = interceptor();

export default function useAnniversaryAdd() {
  const { toastDispatch } = useToastContext();
  const queryClient = useQueryClient();

  const res = useMutation(
    (body) => {
      return axiosInstance
        .post("/api/anniversary/add-anniversary", { ...body })
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
            content: { success: "FAIL", message: data.message },
            type: "success",
          },
        });
      },
    }
  );
  return res;
}
