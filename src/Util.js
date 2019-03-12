const Kefir = require("kefir")

const isAwaiting = (stream, derivative) =>
  Kefir.merge([
    stream.map(() => true),
    derivative.map(() => false),
  ])

module.exports = {isAwaiting}
