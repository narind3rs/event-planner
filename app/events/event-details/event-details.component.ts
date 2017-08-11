import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params } from '@angular/router'
import { IEvent, ISession } from "../index";

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer }
    `]

}) export class EventDetailsComponent {
    addMode: boolean = false
    event: IEvent
    filterBy: string = 'all'
    sortBy: string = 'votes'

    constructor(private eventService: EventService, private route:ActivatedRoute) {

    }

    ngOnInit() {

        this.route.data.forEach((data) => {
            this.event = data['event']
            this.setDefaultState()                  
        })
    }

    setDefaultState() {
        this.addMode = false
        this.filterBy = 'all'
        this.sortBy = 'votes'
    }

    addSession() {
        this.addMode = true
    }

    cancelAddSession() {
        this.addMode = false
    }

    saveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));

        session.id = nextId + 1

        this.event.sessions.push(session)

        this.eventService.saveEvent(this.event).subscribe()
        this.addMode = false

    }

}