import fs from 'fs'
import chalk from 'chalk'

const getNotes = () => {
    return 'Your Notes...'
}

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( (note)=>{
        return note.title == title
    })
   
    if (duplicateNotes.length === 0) {
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
    const updatedNotes = notes.filter( (note)=> {
        return note.title != title
    })
    
    if(notes.length > updatedNotes.length) {
        saveNotes(updatedNotes)
        console.log(chalk.green.inverse('Note Removed!'))
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}

