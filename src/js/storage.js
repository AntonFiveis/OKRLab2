import Note from './note'
export default class NotesStorage{
    constructor() {
        this._notes = localStorage.getItem('notes') || []
    }
    add_note(){
        let note = new Note()
        note.setSelected(true)
        this._notes.forEach(n=>n.setSelected(false))
        this._notes.push(note)
    }
    delete_note(noteDate){
        for(let i=0;i<this._notes.length;i++){
            if(this._notes[i].getDate()==noteDate){
                this._notes.slice(i,1);
                break;
            }
        }
    }
    get_notes
}