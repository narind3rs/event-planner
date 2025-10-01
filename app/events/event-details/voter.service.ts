import { Injectable } from '@angular/core'
import { ISession } from "../shared/event.model"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class VoterService {

    constructor(private http: HttpClient) {}

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName)

        this.http.delete(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`)
            .pipe(catchError(this.handleError))
            .subscribe()
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName)

        let headers = new HttpHeaders({'Content-Type':'application/json'})

        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.post(url, JSON.stringify({}), { headers: headers })
        .pipe(catchError(this.handleError))
        .subscribe()
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName)
    }

    private handleError(error: any) {
        return throwError(() => new Error(error.statusText || 'Server error'));
    }
}