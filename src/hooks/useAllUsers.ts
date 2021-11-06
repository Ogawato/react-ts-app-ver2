import { useMessage } from "./useMessage";
import { User } from "./../types/api/user";
import axios from "axios";
import { useCallback, useState } from "react";
export const useAllUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const { showMessage } = useMessage();

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(() => {
        showMessage({ title: "ユーザー所得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showMessage]);
  return { getUsers, loading, users }; //usersはすべてのユーザー
};
