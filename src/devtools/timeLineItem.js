export default function (name, type, value, path, host, error, timeStamp) {
  if (typeof type === 'undefined') {
    return {
      name: name,
      type: 'event',
      value: {'seconds': 22, 'brutal': 323.22323232323, 'name': 'daadad', 'tester': true, 'canihandleit': { 'dad': 5, 'string': 'hopi', 'stdaring': 'hopi', 'staaring': 'hopi', 'saatring': 'hopi', 'sntring': 'hopi' }},
      path: '/lol.jpg',
      host: 'exponea.com',
      error: {},
      timeStamp: Date.now()
    }
  }

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
