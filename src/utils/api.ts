import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const LINK = `${window.location.protocol}//${window.location.hostname}/aposinvitee/`;

const api: any = axios.create({ baseURL: LINK });

export const fetchData = async (id?: number) => {
  try {
    let url = id ? `number?id=${id}` : `number`;
    let { data }: any = await api.get(url);
    console.log(data);
    enqueueSnackbar(data?.message, { variant: "success" });
    return data?.payload;
  } catch (e: any) {
    console.log(e);
    enqueueSnackbar(e?.response?.data?.message ?? e.message, {
      variant: "error",
    });
    return;
  }
};

export const addData = async (obj: any, edit = false) => {
  try {
    let { data }: any = edit
      ? await api.put("number", obj)
      : await api.post("number", obj);
    console.log(data);
    enqueueSnackbar(data?.message, { variant: "success" });
    return true;
  } catch (e: any) {
    console.log(e?.response?.data?.message);
    let msg =
      e?.response?.data?.message instanceof Array
        ? e?.response?.data?.message.join(",")
        : e.message;
    enqueueSnackbar(msg, { variant: "error" });
    return;
  }
};

export const delData = async (id: number) => {
  try {
    let { data }: any = await api.delete(`number?id=${id}`);

    console.log(data);
    enqueueSnackbar(data?.message, { variant: "success" });
    return true;
  } catch (e: any) {
    console.log(e?.response?.data?.message);

    enqueueSnackbar(e?.response?.data?.message, { variant: "error" });
    return;
  }
};
