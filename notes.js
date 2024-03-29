import fs from 'fs'
import chalk from 'chalk'

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note)=> note.title == title)
   
    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse("New Note added!"))
    }
    else {
        console.log(chalk.red.inverse("Note title taken!"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter( (note)=> note.title != title)
    
    if(notes.length > updatedNotes.length) {
        saveNotes(updatedNotes)
        console.log(chalk.green.inverse('Note Removed!'))
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.white.inverse("Your Notes..."))
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find( (note)=> {
        return note.title == title
    })

    if (noteFound) {
        console.log("Title: "+ (chalk.italic(noteFound.title)))
        console.log("Body: "+ noteFound.body)
    }
    else {
        console.log(chalk.inverse.red('Note not found!'))
    }
}

const saveNotes = (argument) => {
    const dataJSON = JSON.stringify(argument)
    fs.writeFileSync('notes.json',dataJSON)
}


const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json') 
        const jsonData = dataBuffer.toString()
        return JSON.parse(jsonData)
    }
    catch(e) {
        return []
    }
    
}


export default {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}

