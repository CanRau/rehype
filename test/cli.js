'use strict'

var path = require('path')
var execa = require('execa')
var test = require('tape')

var join = path.join

test('rehype-cli', function(t) {
  t.plan(2)

  t.test('should show help on `--help`', function(st) {
    var bin = join('packages', 'rehype-cli', 'cli.js')

    st.plan(1)

    execa(bin, ['--help']).then(function(result) {
      st.equal(
        result.stdout,
        [
          'Usage: rehype [options] [path | glob ...]',
          '',
          '  CLI to process HTML with rehype using plugins',
          '',
          'Options:',
          '',
          '  -h  --help                    output usage information',
          '  -v  --version                 output version number',
          '  -o  --output [path]           specify output location',
          '  -r  --rc-path <path>          specify configuration file',
          '  -i  --ignore-path <path>      specify ignore file',
          '  -s  --setting <settings>      specify settings',
          '  -e  --ext <extensions>        specify extensions',
          '  -u  --use <plugins>           use plugins',
          '  -w  --watch                   watch for changes and reprocess',
          '  -q  --quiet                   output only warnings and errors',
          '  -S  --silent                  output only errors',
          '  -f  --frail                   exit with 1 on warnings',
          '  -t  --tree                    specify input and output as syntax tree',
          '      --report <reporter>       specify reporter',
          '      --file-path <path>        specify path to process as',
          '      --ignore-pattern <globs>  specify ignore patterns',
          '      --tree-in                 specify input as syntax tree',
          '      --tree-out                output syntax tree',
          '      --inspect                 output formatted syntax tree',
          '      --[no-]stdout             specify writing to stdout (on by default)',
          '      --[no-]color              specify color in report (on by default)',
          '      --[no-]config             search for configuration files (on by default)',
          '      --[no-]ignore             search for ignore files (on by default)',
          '',
          'Examples:',
          '',
          '  # Process `input.html`',
          '  $ rehype input.html -o output.html',
          '',
          '  # Pipe',
          '  $ rehype < input.html > output.html',
          '',
          '  # Rewrite all applicable files',
          '  $ rehype . -o'
        ].join('\n'),
        'should show help'
      )
    })
  })

  t.test('should show version on `--version`', function(st) {
    var bin = join('packages', 'rehype-cli', 'cli.js')

    st.plan(2)

    execa(bin, ['--version']).then(function(result) {
      st.ok(
        /rehype: \d+\.\d+\.\d+/.test(result.stdout),
        'should include rehype version'
      )

      st.ok(
        /rehype-cli: \d+\.\d+\.\d+/.test(result.stdout),
        'should include rehype-cli version'
      )
    })
  })
})
