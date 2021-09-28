import { useQuery } from "react-query";
import { interceptor } from "../../utils/interceptor";
import { useMutation, useQueryClient } from "react-query";
import { useToastContext, ADD } from "../../store/ToastContext";
const axiosInstance = interceptor();

export function useFetchAllUsers() {
  const data = useQuery("allusers", () =>
    axiosInstance.get("/api/user-list/details/").then((res) => res.data)
  );
  return data;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { toastDispatch } = useToastContext();

  const res = useMutation(
    async (body) => {
      await axiosInstance
        .put("/api/user/change-firstname", { ...body })
        .then((res) => res.data);
      await axiosInstance
        .put("/api/user/change-surname", { ...body })
        .then((res) => res.data);
      await axiosInstance
        .put("/api/user/change-email", { ...body })
        .then((res) => res.data);
    },
    {
      onError: (error) => {
        try {
          const error = error.response.data;
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "Update failed." },
              type: "danger",
            },
          });
        } catch (e) {
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "Update failed." },
              type: "danger",
            },
          });
        }
      },
      onSuccess: (data) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: { sucess: "FAIL", message: 'Success' },
            type: "success",
          },
        });
      },
    }
  );
  return res;
}

export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();
  const { toastDispatch } = useToastContext();

  console.log("update avatar");

  const res = useMutation(
    (body) => {
      console.log("image src", body.target.files[0]);
      var formdata = new FormData();
      formdata.append("avatar", body.target.files[0]);
      
      return axiosInstance
        .put("/api/user/change-avatar/", formdata, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then((res) => res.data);
    },
    {
      onError: (error) => {
        try {
          const error = error.response.data;
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "Avatar Update failed." },
              type: "danger",
            },
          });
        } catch (e) {
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "Avatar update failed." },
              type: "danger",
            },
          });
        }
      },
      onSuccess: (data) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: { sucess: "FAIL", message: data.message },
            type: "success",
          },
        });
      },
    }
  );
  return res;
}

export function useChangePassword() {
  const queryClient = useQueryClient();
  const { toastDispatch } = useToastContext();

  const res = useMutation(
    (body) => {      
      return axiosInstance
        .put("/api/user/change-password/", { ...body })
        .then((res) => res.data);
    },
    {
      onError: (error) => {
        try {
          const error = error.response.data;
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "Change password failed." },
              type: "danger",
            },
          });
        } catch (e) {
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "Change password failed." },
              type: "danger",
            },
          });
        }
      },
      onSuccess: (data) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: { sucess: "FAIL", message: data.message },
            type: "success",
          },
        });
      },
    }
  );
  return res;
}

export function useDeleteUser(id, token) {
 const deleteUser =  axiosInstance.delete("/api/user-list/member/" + id + "/delete", {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }).then(() => window.location.reload());
  return deleteUser;
  // return axiosInstance.delete("/api/user/" + id).then((res) => res.data);
}
