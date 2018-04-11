const Translator = require('../')

function applyEntityTemplate (schema) {
  const asString = JSON.stringify(schema, null, '  ')

  return `const SCHEMA = ${asString}

module.exports = SCHEMA
`
}

function addAttribute (schema, attribute) {
  return {
    ...schema,
    ...JoiTranslator.parse(attribute)
  }
}

function translateEntity (entity) {
  const schema = entity.attributes
    .reduce(addAttribute, {})

  const content = applyEntityTemplate(schema)

  return content.replace(/"/g, "'")
}

function JoiTranslator (data) {
  Object.assign(this, new Translator({ ...data, translateEntity }))
}

JoiTranslator.parse = function (attribute) {
  const { isRequired, type, name, of: arrayOf } = attribute

  const wrapped = arrayOf ? `[${arrayOf}]` : type

  const attr = `${wrapped}${isRequired ? '.required' : ''}`

  return { [name]: attr }
}

module.exports = JoiTranslator
