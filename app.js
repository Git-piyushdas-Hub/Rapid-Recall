import Notes from './notes.js'
import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const yarg = yargs(hideBin(process.argv))

// customize yargs version
yarg.version('1.1.0')


// Create 'add','remove','list' commands
yarg.command({
    command: "add",
    description: "Add a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        Notes.addNote(argv.title,argv.body)
    }
}).command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        Notes.removeNote(argv.title)
    }
}).command({
    command: 'read',
    description: 'Read a note',
    handler: function () {
        console.log('Reading the note!')
    }
}).command({
    command: 'list',
    description: 'List the notes',
    handler: function () {
        console.log('Listing the notes!')
    }
})

yarg.parse()
// console.log(yarg.argv)



