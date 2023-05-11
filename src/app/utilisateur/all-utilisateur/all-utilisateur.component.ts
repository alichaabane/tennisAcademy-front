import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteFormComponent } from './dialogs/delete-form/delete-form.component';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur.model';


@Component({
  selector: 'app-all-utilisateur',
  templateUrl: './all-utilisateur.component.html',
  styleUrls: ['./all-utilisateur.component.sass']
})
export class AllUtilisateurComponent {
  IMG_BASE_URL = environment.IMG_BASE_URL;
  btnTous:String="";
  btnAdmin:String="";
  btnJou:String="";
  btnEnt:String="";
  
  displayedColumns = [
    'select',
    'id',
    'photo',
    'prenom',
    'nom',
    'email',
    'dateNaissance',
    'dateEngagement',
    'nbrMatchJoues',
    'rate',
    'gender',
    'username',
    'verified',
    'actions',
  ];
  exampleDatabase: UtilisateurService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Utilisateur>(true, []);
  id: number;
  utilisateur: Utilisateur | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  
  ngOnInit() {
    this.btnTous="primary";
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  showTous(){

  }

  showAdmin(){

  }
  showEnt(){

  }
  showJou(){

  }
  
  addNew() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        utilisateur: this.utilisateur,
        action: 'add',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.utilisateurService.addUtilisateur(result).subscribe(
                    res=>{
                      console.log(res);
                      if(res){
                        this.refresh();
                        this.showNotification(
                          'snackbar-success',
                          'Utilisateur ajouter avec succes...!!!',
                          'bottom',
                          'center'
                        );
                      }
                    }
                  );
      }
      else{
        console.log("pas de action");
      }
      this.exampleDatabase.dataChange.value.unshift(
        this.utilisateurService.getDialogData()
      );
    });
  }
  
  
  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        utilisateur: row,
        action: 'editer',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        console.log(result);
        // When using an edit things are little different, firstly we find record inside DataService by id
  
        // Then you update that record using data from dialogData (values you enetered)
        this.utilisateurService.updateUtilisateur(result).subscribe(
          res=>{
            console.log(res);
            if(res){
              this.refresh();
              this.showNotification(
                'black',
                'Terrain editer avec succes...!!!',
                'bottom',
                'center'
              );
            }
          }
        );
          this.utilisateurService.getDialogData();
        // And lastly refresh table
      }else {
        console.log("pas dedit");
      }
    });
  }
  
  
  deleteItem(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      data: row,
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.idUtilisateur === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.utilisateurService.deleteUtilisateur(row.idUtilisateur).subscribe(
          res => {
              if (res) {
                this.refresh();
                this.showNotification(
                  'snackbar-warning',
                  'Terrain effacer avec succes...!!!',
                  'bottom',
                  'center'
                ); 
              } else {
                this.showNotification(
                  'snackbar-danger',
                  'Terrain effacer avec succes...!!!',
                  'bottom',
                  'center'
                ); 
              }
          },
          error => {
          
          }
      );
      }
    });
  }
  
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      console.log(item);
      this.utilisateurService.deleteUtilisateur(item.idUtilisateur).subscribe(
        res => {
            if (res) {
  
            } else {
              this.showNotification(
                'snackbar-danger',
                'Terrain :'+item.idUtilisateur+' non effacer...!!!',
                'bottom',
                'center'
              ); 
            }
        },
        error => {
        
        }
    );    this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Utilisateur>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  
     public async changeDispo(utilisateur){
        if(utilisateur.verified==true)
        utilisateur.verified=false;
        else if(utilisateur.verified==false)
        utilisateur.verified=true;
          this.utilisateurService.changeUtilisateurDispoById(utilisateur.idUtilisateur,utilisateur.verified).subscribe(
            res => {
                if (res) {
                  
                    // this.messageService.add({
                    //     severity: 'SUCCESS',
                    //     summary: 'Success',
                    //     detail: 'Your Sponsor visibility status changed successfully.'
                    // });
                } else {
                    // this.sponsors[index].enable = !this.sponsors[index].enable;
                    // this.messageService.add({
                    //     severity: 'FAILED',
                    //     summary: 'Error',
                    //     detail: 'Your Sponsor status cannot be changed, please try again'
                    // });
                }
            },
            error => {
                // this.sponsors[index].enable = !this.sponsors[index].enable;
                // this.messageService.add({
                //     severity: 'FAILED',
                //     summary: 'Error',
                //     detail: error.error
                // });
            }
        );
      }
  
  public loadData() {
    this.exampleDatabase = new UtilisateurService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Utilisateur) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
  }
  export class ExampleDataSource extends DataSource<Utilisateur> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Utilisateur[] = [];
  renderedData: Utilisateur[] = [];
  constructor(
    public _exampleDatabase: UtilisateurService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Utilisateur[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllUtilisateurs();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((utilisateur: Utilisateur) => {
            const searchStr = (
              utilisateur.idUtilisateur +
              utilisateur.prenom +
              utilisateur.nom +
              utilisateur.username +
              utilisateur.email
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: Utilisateur[]): Utilisateur[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'idUtilisateur':
          [propertyA, propertyB] = [a.idUtilisateur, b.idUtilisateur];
          break;
        case 'prenom':
          [propertyA, propertyB] = [a.prenom, b.prenom];
          break;
        case 'nom':
          [propertyA, propertyB] = [a.nom, b.nom];
          break;
          case 'email':
            [propertyA, propertyB] = [a.email, b.email];
            break;
            case 'username':
              [propertyA, propertyB] = [a.username, b.username];
              break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
  }
