const L = require("partial.lenses")

const DefaultAvatar = require("../assets/default_avatar.jpg").default

const avatarLens = [
  L.prop("avatar"),
  L.reread(url => url === "" ? undefined : url),
  L.defaults(DefaultAvatar),
]

module.exports = {avatarLens}
