const Kefir = require("kefir")
const R = require("ramda")

const isAwaiting = (stream, derivative) =>
  Kefir.merge([
    stream.map(() => true),
    derivative.map(() => false),
  ])

const toggle = obs => () => obs.modify(R.not)

module.exports = {isAwaiting, toggle}
