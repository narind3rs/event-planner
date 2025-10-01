import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { EventService } from "./shared/index";
import { IEvent } from "./index";

@Component({
    templateUrl: './create-event.component.html',
    styles: [`
        em {float:right; color: #E05C65; padding-left: 10px; }
        .error input { background-color: #E3C3C5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error :ms-input-placeholder { color: #999; }
    `]
})
export class CreateEventComponent {
    name: string = ''
    date: string = ''
    time: string = ''
    price: number | undefined
    address: string = ''
    city: string = ''
    country: string = ''
    onlineUrl: string = ''
    imageUrl: string = ''
    isDirty: boolean = true

    constructor(private router: Router, private eventService: EventService) {

    }    

    cancel() {
        this.router.navigate(['/events'])
    }

    saveEvent(formValues) {        
        //console.log(formValues)
        this.eventService.saveEvent(formValues).subscribe(event => {
            console.log(event)
            this.isDirty = false
            this.router.navigate(['/events'])
        })   
        
    }
}