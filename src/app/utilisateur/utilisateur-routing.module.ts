import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUtilisateurComponent } from './add-utilisateur/add-utilisateur.component';
import { AllUtilisateurComponent } from './all-utilisateur/all-utilisateur.component';
import { EditUtilisateurComponent } from './edit-utilisateur/edit-utilisateur.component';


const routes: Routes = [
    {
      path: 'all-utilisateurs',
      component: AllUtilisateurComponent
    },
    {
      path: 'add-utilisateur',
      component: AddUtilisateurComponent
    },
    {
      path: 'edit-utilisateur',
      component: EditUtilisateurComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UtilisateurRoutingModule { }
  