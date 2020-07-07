const yargs = require("yargs");
const chalk = require("chalk");
const notes = require("./notes.js");

// create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "title of the note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "descripton of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// create remove command
yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        title: {
            describe: "title of the note to be removed",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

// list all notes
yargs.command({
    command: "list",
    describe: "list all notes",
    handler() {
        notes.listNotes()
    }
})

// read a note
yargs.command({
    command: "read",
    describe: "read a note",
    builder: {
        title: {
            describe: "title of the note to be read",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// calls the yargs function and parses all commands
// console.log(yargs.argv);
// a better way to parse the commands is 
yargs.parse();