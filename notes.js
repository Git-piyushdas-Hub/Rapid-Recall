import fs from 'fs'

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
        console.log("Note added!")
    }
    else {
        console.log("Note title taken...")
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
    addNote: addNote
}

