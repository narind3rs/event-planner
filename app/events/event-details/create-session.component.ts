import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISession } from '../shared/index'
import { restrictedWords } from '../shared/restricted-words.validator'

@Component({
    selector: 'create-session',
    templateUrl: 'app/events/event-details/create-session.component.html',
    styles: [`
        em {float:right; color: #E05C65; padding-left: 10px; }
        .error input { background-color: #E3C3C5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error :ms-input-placeholder { color: #999; }
    `]
})
export class CreateSessionComponent implements OnInit {
    @Output() cancelAddSession = new EventEmitter()  
    @Output() saveNewSession = new EventEmitter()
    newSessionForm: FormGroup
    name: FormControl
    abstract: FormControl
    level: FormControl
    duration: FormControl
    presenter: FormControl

    ngOnInit() {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar']) ])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }    

    saveSession(formValues) {
        let session: ISession = {
            name: formValues.name,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            duration: +formValues.duration,
            voters: [],
            id: undefined
        }

        this.saveNewSession.emit(session)
    }

    cancel() {
        this.cancelAddSession.emit()
    }

}