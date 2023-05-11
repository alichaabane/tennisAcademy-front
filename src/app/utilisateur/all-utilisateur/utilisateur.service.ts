import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from 'src/app/role/role.model';
import { environment } from 'src/environments/environment';
import { Utilisateur } from './utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private Url = environment.apiUrl + 'auth';
  IMG_BASE_URL = environment.IMG_BASE_URL;
  isTblLoading = true;
  dataChange: BehaviorSubject<Utilisateur[]> = new BehaviorSubject<Utilisateur[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Utilisateur[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  
  /** CRUD METHODS */
  getAllUtilisateurs(): void {
    this.httpClient.get<Utilisateur[]>(this.Url).subscribe(
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

  getAllActiveAdmins(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.Url + '/admin');  
  }

  getAllActiveEntraineurs(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.Url + '/entraineur');  
  }

  getAllActiveJoueurs(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.Url + '/joueur');  
  }

  getAllRoles(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(environment.apiUrl+"role");
  }

  // DEMO ONLY, you can find working methods below
  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    this.dialogData = utilisateur;
    return this.httpClient.post<Utilisateur>(this.Url+"/adminSignup",utilisateur);
  }
  updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    this.dialogData = utilisateur;
    console.log(utilisateur);
    return this.httpClient.put<Utilisateur>(this.Url + '/edit',utilisateur);
  }
  deleteUtilisateur(id: number):Observable<boolean> {
    return this.httpClient.delete<boolean>(this.Url+'/'+id);
  }
  
  public getImageByUrl(imageName: string): Observable<any> {
    return this.httpClient.get(this.IMG_BASE_URL + 'media/' + imageName, {responseType: 'blob'});
  }
  
  
    public changeUtilisateurDispoById(utilisateurId: number, status: boolean): Observable<boolean> {
        return this.httpClient.put<boolean>(this.Url + '/changeDispo/' + utilisateurId, status);
    }
    
  }
