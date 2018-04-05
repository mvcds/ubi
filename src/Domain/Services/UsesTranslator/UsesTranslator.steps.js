const assert = require('assert')
const fs = require('fs')
const { Given, When, Then } = require('cucumber')
const { mock } = require('sinon')
const { lorem } = require('faker')

const UbiquitousLanguage = require('../../Objects/UbiquitousLanguage')

const UsesTranslator = require('./')

const FILE = JSON.parse(
  fs.readFileSync(`${__dirname}/fixture/file.fixture`, 'utf8')
)

function fix (fixture) {
  if (typeof fixture === 'object') return JSON.stringify(fixture, null, 2).trim()

  return fixture.trim()
}

Given('the {string} translator', function (translatorName) {
  this.args = Object.assign({}, this.args, { translatorName })
})

Given('set writer', function () {
  this.aux = Object.assign({}, this.aux, {
    writer: mock('writer')
  })
})

Given('some output', function () {
  this.aux = Object.assign({}, this.aux, {
    output: lorem.word()
  })
})

Given('a pen', function () {
  this.aux = Object.assign({}, this.aux, {
    pen: mock('pen')
  })
})

When('I call UsesTranslator', function () {
  const ubiquitousLanguage = new UbiquitousLanguage({
    entities: [ FILE ]
  })

  this.args = Object.assign({}, this.args, { ubiquitousLanguage })

  this.result = UsesTranslator(this.args)
})

Then('translation yield expected file', function () {
  const filePath = `${__dirname}/fixture/file.${this.args.translatorName}.fixture`
  const { writer, output, pen } = this.aux

  const expectation = fs.readFileSync(filePath, 'utf8')
  const [ { entity } ] = this.result.translate({ writer, output }, { pen })

  assert.equal(fix(entity), fix(expectation))
})
