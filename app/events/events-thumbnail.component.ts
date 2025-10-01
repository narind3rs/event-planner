import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IEvent } from "./index";

@Component({
    selector: 'event-thumbnail',
    templateUrl: './event-thumbnail.component.html'
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