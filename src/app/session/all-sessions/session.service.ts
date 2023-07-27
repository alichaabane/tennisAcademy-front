import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Planification } from 'src/app/planification/all-planifications/planification.model';
import { Terrain } from 'src/app/terrain/all-terrain/terrain.model';
import { environment } from 'src/environments/environment';
import { Session } from '../all-sessions/Session.model';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private Url = environment.apiUrl + 'session';
  isTblLoading = true;
  dataChange: BehaviorSubject<Session[]> = new BehaviorSubject<Session[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Session[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSessions(): void {
    this.httpClient.get<Session[]>(this.Url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addSession(terrain: Session): Observable<Session> {
    this.dialogData = terrain;
    return this.httpClient.post<Session>(this.Url,terrain);
  }
  updateSession(session: Session): Observable<Session> {
    // this.dialogData = terrain;
    // console.log(terrain);
     return this.httpClient.put<Session>(this.Url + '/edit',session);
  }
  deleteSession(id: number):Observable<boolean> {
    return this.httpClient.delete<boolean>(this.Url+'/'+id);
  }

  getAllPlanification(): Observable<Planification[]> {
    return this.httpClient.get<Planification[]>(environment.apiUrl+"planification");
  }

  getAllTerrain(): Observable<Terrain[]> {
    return this.httpClient.get<Terrain[]>(environment.apiUrl+"terrain");
  }
    
  }
