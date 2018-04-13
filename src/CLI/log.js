const WriteUbiquitousLanguage = require('../Domain/UseCases/WriteUbiquitousLanguage')

function target ({ object }) {
  console.log(object)
}

function LogUbiquitousLanguageCommand (program) {
  program
    .command('log')
    .alias('l')
    .description('Logs the ubiquitous language objects to the console')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-t, --translator [translator]', 'Language translator (log|ubi|site)', 'log')
    .option('-v, --verbose [verbose]', 'When activated shows text on cli', false)
    .action(WriteUbiquitousLanguage.bind({ target }))
}

module.exports = LogUbiquitousLanguageCommand
