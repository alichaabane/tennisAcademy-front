import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSessionComponent } from './add-session/add-session.component';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';

const routes: Routes = [
    {
      path: 'all-sessions',
      component: AllSessionsComponent
    },
    {
        path: 'add-session',
        component: AddSessionComponent
    },
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SessionRoutingModule { }