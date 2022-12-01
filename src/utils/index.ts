import datjs from "dayjs";

export const FormatTime = (date: Date | number) => {
  return datjs(date).format("YYYY/MM/DD hh:mm");
};

export const ImitateHttp = (
  fun: (s: Function, f: Function) => void,
  timer = 1000
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => fun(resolve, reject), timer);
  });
};

export const geneId = (): number => {
  return Math.floor(Math.random() * 939874);
};
