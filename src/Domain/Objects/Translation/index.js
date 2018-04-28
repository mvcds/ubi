const RequiresAttribute = require('../../Services/RequiresAttribute')

function stringify ([ name, translation ]) {
  if (typeof translation.translated === 'string') return [ name, translation ]

  const { token, translated } = translation

  const stringified = JSON.stringify(translated, null, 2)

  return [ name, { token, translated: stringified } ]
}

function Translation (data) {
  RequiresAttribute(data, {
    lexicon: 'lexicon'
  })

  const stringified = Array.from(data.lexicon)
    .map(stringify)

  const lexicon = new Map(stringified)

  this.lexicon = lexicon
}

module.exports = Translation