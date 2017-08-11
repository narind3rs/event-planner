import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IEvent } from "./index";

@Component({
    selector: 'event-thumbnail',
    templateUrl: 'app/events/event-thumbnail.component.html',
    styleUrls: [
        'app/assets/css/site.css'
    ]
})
export class EventThumbnailComponent {
    @Input() event: IEvent

    getStartTimeClass() {
        if (this.event && this.event.time === '8:00 am') {
            return ['green', 'bold']
        }
        return []
    }
}