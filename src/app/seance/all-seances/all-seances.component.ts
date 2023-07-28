import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SeanceService} from './seance.service';
import {Seance} from './Seance.model';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatMenuTrigger} from '@angular/material/menu';
import {FormDialogComponent} from './dialog/form-dialog/form-dialog.component';
import {DeleteFormComponent} from './dialog/delete-form/delete-form.component';
import {BehaviorSubject, fromEvent, map, Observable, merge} from 'rxjs';
import {User} from "../../core/models/user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-all-seances',
  templateUrl: './all-seances.component.html',
  styleUrls: ['./all-seances.component.sass']
})
export class AllSeancesComponent implements OnInit {

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public seanceService: SeanceService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  displayedColumns = [
    'select',
    'idSeance',
    'dateDebut',
    'dateFin',
    'terrain',
    'type',
    'adhérent',
    'actions',
  ];
  exampleDatabase: SeanceService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Seance>(true, []);
  id: number;
  seance: Seance | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  protected readonly User = User;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.ngOnInit();
  }

  addNew() {
    this.router.navigate(['/seance/add-seance']);
  }


  editCall(row) {
    console.log('row = ', row);
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        seance: row,
        action: 'editer',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        console.log('after close modal ' , result);
        // When using an edit things are little different, firstly we find record inside DataService by id

        // Then you update that record using data from dialogData (values you enetered)
        this.seanceService.getDialogData();
        setTimeout( () => {

        this.seanceService.updateSeance(result).subscribe(
          res => {
            console.log(res);
            if (res) {
              this.refresh();
              this.showNotification(
                'black',
                'seance  mise à jour avec succes...!!!',
                'bottom',
                'center'
              );
            }
          }
        );
        }, 2000);
        // And lastly refresh table
      } else {
        console.log("pas de mise à jour");
      }
    });
  }


  deleteItem(row) {
    this.seanceService.deleteSeance(row?.idSeance).subscribe(res => {
      console.log('res = ', res);
      if (res) {
        this.showNotification(
          'snackbar-info',
          'Seance supprimé avec succés',
          'bottom',
          'center'
        );
      }
    }, error => {
      this.showNotification(
        'snackbar-danger',
        'Erreur dans la suppression de séance !',
        'bottom',
        'center'
      );
    });
    this.refresh();
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
      this.seanceService.deleteSeance(item?.idSeance).subscribe(res => {
        console.log('res = ', res);
        if (res) {
          this.showNotification(
            'snackbar-info',
            'Seance supprimé avec succés',
            'bottom',
            'center'
          );
        }
      }, error => {
        this.showNotification(
          'snackbar-danger',
          'Erreur dans la suppression de séance !',
          'bottom',
          'center'
        );
      });
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Seance>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }


  public loadData() {
    this.exampleDatabase = new SeanceService(this.httpClient);
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
  onContextMenu(event: MouseEvent, item: Seance) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

}

export class ExampleDataSource extends DataSource<Seance> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Seance[] = [];
  renderedData: Seance[] = [];

  constructor(
    public _exampleDatabase: SeanceService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Seance[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllSeances();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((seance: Seance) => {
            console.log('seance = ', seance)
            const searchStr = (
              seance.idSeance +
              seance.planification?.cours.label
            ).toString().toLowerCase();
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

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Seance[]): Seance[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'idSeance':
          [propertyA, propertyB] = [a.idSeance, b.idSeance];
          break;
        case 'planification.cours.label':
          [propertyA, propertyB] = [a.planification.cours.label, b.planification.cours.label];
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
