import moment from "moment";

const timeDifferent = (time) => {
  var endTm = time
    .split("+")[0]
    .replace("z", "")
    .replace("T", " ")
    .replaceAll("-", "/");
  const now = moment()
    .format()
    .toLocaleString()
    .split("+")[0]
    .replace("z", "")
    .replace("T", " ")
    .replaceAll("-", "/");
  var ms = moment(endTm, "DD/MM/YYYY HH:mm:ss").diff(
    moment(now, "DD/MM/YYYY HH:mm:ss")
  );
  var d = moment.duration(ms);
  var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  if (time < moment().format()) return "00:00:00";
  return s;
};

export default timeDifferent;
