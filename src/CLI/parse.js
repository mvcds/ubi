const ParseDomainFileIntoSourceFile = require('../Domain/UseCases/ParseDomainFileIntoSourceFile')

function ParseDomainFileIntoSourceFileCommand (program) {
  program
    .command('parse')
    .alias('p')
    .description('Parses a domain files into source file')
    .option('-s, --source [source]', 'Path to the source file')
    .option('-d, --domain [domain]', 'Path to the domain file')
    .action(ParseDomainFileIntoSourceFile)
}

module.exports = ParseDomainFileIntoSourceFileCommand