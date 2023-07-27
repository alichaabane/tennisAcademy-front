import { Component, ViewChild, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';

import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDialogComponent } from '../all-sessions/dialog/form-dialog/form-dialog.component';
import { ShowSessionService } from './show-session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Session } from '../all-sessions/Session.model';

@Component({
  selector: 'app-show-session',
  templateUrl: './show-session.component.html',
  styleUrls: ['./show-session.component.sass']
})
export class ShowSessionComponent{
//   @ViewChild('session', { static: false })
//   session: Session | null;
//   public addCusForm: FormGroup;
//   dialogTitle: string;
//   filterOptions = 'All';
//   sessionData: any;
//   filterItems: string[] = [
//     'Sessions Planifiees',
//     'Sessions libres',
//   ];

//   sessionEvents: EventInput[];
//   tempEvents: EventInput[];

//   public filters = [
//     { name: 'Sessions Planifiees', value: 'Sessions Planifiees', checked: true },
//     { name: 'Sessions libres', value: 'Sessions libres', checked: true },
//   ];


//   constructor(
//     private fb: FormBuilder,
//     private dialog: MatDialog,
//     public sessionService: ShowSessionService,
//     private snackBar: MatSnackBar) 
//     {
//     this.dialogTitle = 'Add New Event';
//     this.session = new Calendar({});
//     this.addCusForm = this.createSessionForm(this.session);

//   }

//   public ngOnInit(): void {
//     this.sessionEvents = INITIAL_EVENTS;
//     //this.getAllSessions();
//     this.tempEvents = this.sessionEvents;
//     this.calendarOptions.initialEvents = this.sessionEvents;

//   }

//   getAllSessions(){

//     // id: "event1",
//     // title: "All Day Event",
//     // start: new Date(year, month, 1, 0, 0),
//     // end: new Date(year, month, 1, 23, 59),
//     // className: "fc-event-success",
//     // groupId: "Sessions Planifiees",
//     // details:
//     //   "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",

// //     const d = new Date();
// // const day = d.getDate();
// // const month = d.getMonth();
// // const year = d.getFullYear();


// // this.calendarService.getAllSessions().subscribe(
// //   data => {
// //     if (data) {
// //       console.log(data);
// //       data.forEach(element=>this.sessionsList.push(element));
// //       this.sessionsList=data;
// //       this.showNotification(
// //         'snackbar-succes',
// //         'sessions importer avec succes...!!!',
// //         'bottom',
// //         'center'
// //       ); }
// //       else{

// //       }
// //     }
// // );

// //     console.log(this.sessionsList);
// //     this.sessionsList.forEach(element=>{
// //       this.calendarEvents
// //     });

// //     console.log(this.calendarEvents);  
//   }

//   calendarOptions: CalendarOptions = {
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
//     },
//     initialView: 'dayGridMonth',
//     weekends: true,
//     editable: true,
//     selectable: true,
//     selectMirror: true,
//     dayMaxEvents: true,
//     select: this.handleDateSelect.bind(this),
//     eventClick: this.handleEventClick.bind(this),
//     eventsSet: this.handleEvents.bind(this),
//   };

//   handleDateSelect(selectInfo: DateSelectArg) {
//     this.addNewEvent();
//   }

//   addNewEvent() {
//     // let tempDirection;
//     // if (localStorage.getItem('isRtl') === 'true') {
//     //   tempDirection = 'rtl';
//     // } else {
//     //   tempDirection = 'ltr';
//     // }
//     // const dialogRef = this.dialog.open(FormDialogComponent, {
//     //   data: {
//     //     calendar: this.calendar,
//     //     action: 'add',
//     //   },
//     //   direction: tempDirection,
//     // });

//     // dialogRef.afterClosed().subscribe((result) => {
//     //   if (result === 'submit') {
//     //     this.calendarData = this.calendarService.getDialogData();

//     //     this.calendarEvents = this.calendarEvents.concat({
//     //       // add new event data. must create new array
//     //       id: this.calendarData.id,
//     //       title: this.calendarData.title,
//     //       start: this.calendarData.startDate,
//     //       end: this.calendarData.endDate,
//     //       className: this.getClassNameValue(this.calendarData.category),
//     //       groupId: this.calendarData.category,
//     //       details: this.calendarData.details,
//     //     });
//     //     this.calendarOptions.events = this.calendarEvents;
//     //     this.addCusForm.reset();
//     //     this.showNotification(
//     //       'snackbar-success',
//     //       'Add Record Successfully...!!!',
//     //       'bottom',
//     //       'center'
//     //     );
//     //   }
//     // });
//   }

//   changeCategory(event: MatCheckboxChange, filter) {
//     if (event.checked) {
//       this.filterItems.push(filter.name);
//     } else {
//       this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
//     }
//     this.filterEvent(this.filterItems);
//   }

//   filterEvent(element) {
//     const list = this.sessionEvents.filter((x) =>
//       element.map((y) => y).includes(x.groupId)
//     );

//     this.calendarOptions.events = list;
//   }

//   handleEventClick(clickInfo: EventClickArg) {
//     this.eventClick(clickInfo);
//   }

//   eventClick(row) {
//     const calendarData: any = {
//       idSession: row.event.idSession,
//       title: row.event.title,
//       category: row.event.groupId,
//       startDate: row.event.start,
//       endDate: row.event.end,
//       details: row.event.extendedProps.details,
//     };

//     let tempDirection;
//     if (localStorage.getItem('isRtl') === 'true') {
//       tempDirection = 'rtl';
//     } else {
//       tempDirection = 'ltr';
//     }
//     const dialogRef = this.dialog.open(FormDialogComponent, {
//       data: {
//         calendar: calendarData,
//         action: 'edit',
//       },
//       direction: tempDirection,
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result === 'submit') {
//         this.calendarData = this.calendarService.getDialogData();
//         this.calendarEvents.forEach(function (element, index) {
//           if (this.calendarData.id === element.id) {
//             this.editEvent(index, this.calendarData);
//           }
//         }, this);
//         this.showNotification(
//           'black',
//           'Edit Record Successfully...!!!',
//           'bottom',
//           'center'
//         );
//         this.addCusForm.reset();
//       } else if (result === 'delete') {
//         this.calendarData = this.calendarService.getDialogData();
//         this.calendarEvents.forEach(function (element, index) {
//           if (this.calendarData.id === element.id) {
//             row.event.remove();
//           }
//         }, this);

//         this.showNotification(
//           'snackbar-danger',
//           'Delete Record Successfully...!!!',
//           'bottom',
//           'center'
//         );
//       }
//     });
//   }

//   editEvent(eventIndex, calendarData) {
//     const calendarEvents = this.calendarEvents.slice();
//     const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
//     singleEvent.id = calendarData.id;
//     singleEvent.title = calendarData.title;
//     singleEvent.start = calendarData.startDate;
//     singleEvent.end = calendarData.endDate;
//     singleEvent.className = this.getClassNameValue(calendarData.category);
//     singleEvent.groupId = calendarData.category;
//     singleEvent.details = calendarData.details;
//     calendarEvents[eventIndex] = singleEvent;
//     this.calendarEvents = calendarEvents; // reassign the array

//     this.calendarOptions.events = calendarEvents;
//   }

//   handleEvents(events: EventApi[]) {
//     // this.currentEvents = events;
//   }

//   createSessionForm(calendar): FormGroup {
//     return this.fb.group({
//       id: [calendar.id],
//       title: [
//         calendar.title,
//         [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
//       ],
//       category: [calendar.category],
//       startDate: [calendar.startDate, [Validators.required]],
//       endDate: [calendar.endDate, [Validators.required]],
//       details: [
//         calendar.details,
//         [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
//       ],
//     });
//   }

//   showNotification(colorName, text, placementFrom, placementAlign) {
//     this.snackBar.open(text, '', {
//       duration: 2000,
//       verticalPosition: placementFrom,
//       horizontalPosition: placementAlign,
//       panelClass: colorName,
//     });
//   }

//   getClassNameValue(category) {
//     let className: string;

//     if (category === 'work') className = 'fc-event-success';
//     else if (category === 'personal') className = 'fc-event-warning';
//     else if (category === 'important') className = 'fc-event-primary';
//     else if (category === 'travel') className = 'fc-event-danger';
//     else if (category === 'friends') className = 'fc-event-info';

//     return className;
//   }
}
