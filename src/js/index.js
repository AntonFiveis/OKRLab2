import '../css/style.css'
import NotesStorage from "./storage";
import Note from "./note";
let storage = new NotesStorage()
let note= new Note()
let add_note= document.getElementById('add_note')
let delete_note = document.getElementById('delete_note')
add_note.onclick((ev)=>{
    storage.add_note()
    update_page({...storage})
})