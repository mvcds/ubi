const assert = require('assert')
const { lorem } = require('faker')

const parser = require('./')

const AttributeFactory = require('./Attributes/Attribute.factory')

const testType = (data, expectation) => {
  const value = parser(data)

  assert.equal(value.type, expectation)

  return value
}

describe('AttributeParser', () => {
  context('String', () => {
    it('Parsers a string to string attribute', () => testType(lorem.word(), 'string'))

    it('Parsers implicity object to string attribute', () => testType(AttributeFactory.TypelessObject(), 'string'))

    it('Parsers string value to string', () => testType(AttributeFactory.String(), 'string'))
  })

  context('Boolean', () => {
    it('Parsers bool value to boolean attribute', () => testType(AttributeFactory.Bool(), 'boolean'))

    it('Parsers boolean value to boolean attribute', () => testType(AttributeFactory.Boolean(), 'boolean'))
  })

  context('Date', () => {
    it('Parsers date value to date attribute', () => testType(AttributeFactory.Date(), 'date'))
  })

  context('Float', () => {
    it('Parsers decimal value to float attribute', () => testType(AttributeFactory.Decimal(), 'float'))

    it('Parsers float value to float attribute', () => testType(AttributeFactory.Float(), 'float'))

    it('Parsers number value to float attribute', () => testType(AttributeFactory.Number(), 'float'))
  })

  context('Integer', () => {
    it('Parsers int value to integer attribute', () => testType(AttributeFactory.Int(), 'integer'))

    it('Parsers integer value to integer attribute', () => testType(AttributeFactory.Integer(), 'integer'))
  })

  context('JSON', () => {
    it('Parsers JSON value to JSON attribute', () => testType(AttributeFactory.JSON(), 'json'))
  })

  context('Object', () => {
    it('Parsers object value to object attribute', () => testType(AttributeFactory.Object(), 'object'))

    it('Parsers shape value to object attribute', () => testType(AttributeFactory.Shape(), 'object'))
  })

  context('Token', () => {
    it('Parsers tokens value to its name', () => {
      const objectName = lorem.word()

      testType(AttributeFactory.Token(objectName), objectName)
    })
  })

  context('Array', () => {
    it('Parsers array value to array attribute', () => testType(AttributeFactory.Array(), 'array'))

    it('Parsers object value to the array attibute', () => {
      const objectName = lorem.word()

      const attribute = testType(AttributeFactory.Array(objectName), 'array')

      assert.equal(attribute.of, objectName, `${attribute}`)
    })
  })

  //  TODO: fix intermitence
  context.skip('Deprecation', () => {
    const testDeprecation = ({ deprecated }, message, error) => {
      it('Matches the message', () => assert.equal(deprecated.message, message))

      it('Matches the error', () => assert.equal(deprecated.error, error))
    }

    describe('Textual deprecation', () => {
      const text = lorem.sentence()

      const attribute = parser(AttributeFactory.DeprecatedWithText(text))

      testDeprecation(attribute, text, false)
    })

    describe('Boolean deprecation', () => {
      const name = lorem.word()

      const attribute = parser(AttributeFactory.DeprecatedWithBoolean(name))

      testDeprecation(attribute, `"${name}" is marked as deprecated`, false)
    })

    describe('Deprecation object', () => {
      const name = lorem.sentence()

      const attribute = parser(AttributeFactory.DeprecatedWithError(name))

      testDeprecation(attribute, `"${name}" is marked as deprecated`, true)
    })
  })

  context('Function', () => {
    it('Parsers function value to function attribute', () => testType(AttributeFactory.Function(), 'function'))

    it('Parsers func value to function attribute', () => testType(AttributeFactory.Func(), 'function'))

    it('Parsers method value to function attribute', () => testType(AttributeFactory.Method(), 'function'))

    it('Parsers procedure value to function attribute', () => testType(AttributeFactory.Procedure(), 'function'))
  })
})
