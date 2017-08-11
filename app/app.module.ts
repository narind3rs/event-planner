import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {    
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventResolver,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
} from './events/index'

import { EventsAppComponent } from './events-app-component'
import { NavBarComponent } from './nav/navbar.component'

import { CollapsibleWellComponent,
        IToastr,
        TOASTR_TOKEN,
        JQ_TOKEN,
        SimpleModalComponent,
        ModalTriggerDirective
} from './common/index'

import { appRoutes } from './routes'
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";



declare let toastr: IToastr
declare let jQuery: Object

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        CreateEventComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        DurationPipe,
        UpvoteComponent,
        LocationValidator
    ],
    providers: [
        EventService,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        EventResolver, 
        EventListResolver,
        AuthService,
        VoterService,        
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule { }

//Should Move it to another file
function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have unsaved changes, do you want to cancel?')
    }
    return true
}