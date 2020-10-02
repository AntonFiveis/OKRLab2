import Note from './note'
export default class NotesStorage{
    constructor(notes = []) {
        this._notes = notes
        this._selected = 0;
    }

    add_note(){
        let note = new Note()
        note.setSelected(true)
        this._notes.forEach(n=>n.setSelected(false))
        this._notes.push(note)
        this._selected = note.getDate()
    }
    delete_note(noteDate){
        for(let i=0;i<this._notes.length;i++){
            if(this._notes[i].getDate()==noteDate){
                this._notes.splice(i,1);
                break;
            }
        }
        this._selected= 0;
    }
    edit_note(noteDate,value){
        for(let i=0;i<this._notes.length;i++){
            if(this._notes[i].getDate()===noteDate) {
                this._notes[i].setText(value);
                break;
            }
        }
    }
    makeFirst(noteDate){
        for(let i=0;i<this._notes.length;i++){
            if(this._notes[i].getDate()===noteDate) {
                const note= this._notes[i]
                this._notes.splice(i,1)
                this._notes.push(note)
                break;
            }
        }
    }
}