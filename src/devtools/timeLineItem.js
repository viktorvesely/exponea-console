export default function (name, type, value, path, host, error, timeStamp) {
  return {
    name: name,
    type: type,
    value: value,
    path: path,
    host: host,
    error: error,
    timeStamp: timeStamp
  }
}
