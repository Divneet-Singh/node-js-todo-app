const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes....";


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        console.log(chalk.red.inverse('Note Title Taken! '));
    } else {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse('Note Saved! '));
        saveNotes(notes);
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No Note Found!'));
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJson);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
}

const listNotes = () => {
    const allNotes = loadNotes();
    console.log(chalk.yellow("Your Notes"))
    allNotes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const allNotes = loadNotes();
    const theNote = allNotes.find(note => note.title === title);
    if (theNote) {
        console.log(chalk.inverse(theNote.title));
        console.log(theNote.body);
    } else {
        console.log(chalk.red.inverse("Unable to find note"));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};