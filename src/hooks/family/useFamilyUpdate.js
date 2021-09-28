import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import { useMutation, useQueryClient } from "react-query";
import { useToastContext, ADD } from "../../store/ToastContext";
const axiosInstance = interceptor();

export function useFamilyUpdate(id) {
  const queryClient = useQueryClient();
  const { toastDispatch } = useToastContext();

  const res = useMutation(
    async (body) => {
      await axiosInstance
        .put(`/api/family/update-member/${body.id}`, {
          name: body.name,
          type: body.type,
          birthday: body.birthday,
          age: body.age,
        })
        .then(() => window.location.reload());
    },
    {
      onError: (error) => {
        try {
          const error = error.response.data;
          toastDispatch({
            type: ADD,
            payload: {
              content: { success: "FAIL", message: "失敗しました。" },
              type: "danger",
            },
          });
        } catch (e) {
          toastDispatch({
            type: ADD,
            payload: {
              content: { success: "FAIL", message: "失敗しました。" },
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
