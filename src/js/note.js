export default class Note{
    constructor(text='') {
        this._text = text;
        this._title = this.findTitleFromText(text);
        this._selected = true;
        this._createdDate = new Date();
        this._editedDate = new Date();
        this._urlID = +this._createdDate
    }
    get_urlID(){
        return this._urlID
    }
    findTitleFromText(text){
        let title = text.slice(0,20).replace('\n','');

        if(title!=='') {
            return title;
        }
        else{
            return 'New Note'
        }
    }
    setSelected(selected){
        this._selected = selected;
    }
    getSelected(){
        return this._selected;
    }
    setText(text){
        this._text=text;
        this._editedDate = new Date();
        this._title = this.findTitleFromText(text);
    }
    getText(){
        return this._text;
    }
    getDate(){
        return this._createdDate
    }
    getEditionDate(){
        return this._editedDate
    }
    getTitle(){
        return this._title
    }
}