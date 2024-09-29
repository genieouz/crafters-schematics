import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import Notiflix from 'notiflix';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { MultiSelectModule } from 'src/app/shared/components/multi-select/multi-select.module';
import { defaultTablePageSize } from 'src/app/shared/constants';
import { DropdownModule } from 'src/app/shared/directives/dropdown/dropdown.module';
import { GoBackModule } from 'src/app/shared/directives/go-back/go-back.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MockService } from 'src/app/shared/services/mock.service';
import { SelectOptions } from 'src/app/shared/utils/selec-options';
import {
  <%= classify(name) %>,
  Delete<%= classify(name) %>GQL,
  Fetch<%= classify(name) %>sGQL,
  PaginationInfo,
  Publish<%= classify(name) %>GQL,
  UnPublish<%= classify(name) %>GQL,
} from 'src/graphql/generated';

@Component({
  selector: 'app-<%= dasherize(name) %>-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatFormFieldModule,
    DropdownModule,
    MaterialModule,
    MultiSelectModule,
    GoBackModule,
  ],
  templateUrl: './<%= dasherize(name) %>-list.page.html',
  styleUrl: './<%= dasherize(name) %>-list.page.scss',
})
export class <%= classify(name) %>ListPage implements AfterViewInit {
  data: { pagination: PaginationInfo; results: <%= classify(name) %>[] };
  currentPage: number = 1;
  pageSize: number = defaultTablePageSize;
  totalItems: number = 0;
  displayedColumns: string[] = [
    'title',
    'description',
    'published',
    'publishedAt',
    'inSpotlight',
    'action',
  ];
  dataSource = new MatTableDataSource<any>(null);
  //filter
  dataFilter: any = null;

  selectedState: string = 'Choisir un état';
  selectedStatut: string;
  selectedHeadline: string;
  selectedProcedure: string;

  states: any[] = SelectOptions.states;
  statuts: any[] = SelectOptions.statuts;
  StatutsHeadline: any[] = SelectOptions.statutsHeadline;
  statutProcedure: any[] = SelectOptions.statutProcedure;

  filterForm: FormGroup = new FormGroup({});
  private searchTerms = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: MockService,
    private fetch<%= classify(name) %>sGQL: Fetch<%= classify(name) %>sGQL,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private delete<%= classify(name) %>GQL: Delete<%= classify(name) %>GQL,
    private publish<%= classify(name) %>GQL: Publish<%= classify(name) %>GQL,
    private unPublish<%= classify(name) %>GQL: UnPublish<%= classify(name) %>GQL
  ) {
    this.get<%= classify(name) %>s(false);
    this.filterForm = this.fb.group({
      search: [''],
      published: [null],
      inSpotlight: [null],
    });
    this.searchTerms
      .pipe(
        debounceTime(500), // Attendre 500ms après chaque frappe avant de lancer la requête
        distinctUntilChanged(), // Ignorer la recherche si la même requête est répétée
        tap((term: string) => this.get<%= classify(name) %>s())
      )
      .subscribe((r) => {});
  }

  getFilters() {
    const value: any = { ...this.filterForm.value };
    Object.keys(value).map((k) => {
      if (value[k] == null || k == 'search') {
        delete value[k];
      }
    });
    return value;
  }

  ngAfterViewInit(): void {
    this.initPaginator();
  }

  initPaginator() {
    if (this.data && this.data.results) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  get<%= classify(name) %>s(useCache = true) {
    const search = this.filterForm?.value?.search || null;
    const <%= camelize(name) %>Filter = this.getFilters();
    const queryConfig = {
      limit: this?.paginator?.pageSize || this.pageSize,
      page: this.currentPage,
      search
    };
    Notiflix.Loading.hourglass();
    this.fetch<%= classify(name) %>sGQL
      .fetch(
        { queryConfig: { ...queryConfig, ...<%= camelize(name) %>Filter } },
        { fetchPolicy:  useCache ? 'cache-first' : 'no-cache' }
      )
      .subscribe((result) => {
        Notiflix.Loading.remove();
        this.data = result.data.fetch<%= classify(name) %>s as any;
        this.currentPage = this.data.pagination.currentPage;
        this.totalItems = this.data.pagination.totalItems;
        this.dataSource.data = this.data.results;
      });
  }

  changePage(event) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    this.currentPage = pageIndex + 1;
    this.pageSize = pageSize;
    this.get<%= classify(name) %>s();
  }

  handleDelete<%= classify(name) %>(id: string) {
    this.openDialogDelete(id);
  }

  handlePublish<%= classify(name) %>(id: string) {
    this.openDialogPublish(id);
  }

  handleUnPublish<%= classify(name) %>(id: string) {
    this.openDialogUnPublish(id);
  }

  search($event: Event) {
    this.searchTerms.next(($event.target as HTMLInputElement).value);
  }

  openDialogDelete(id: string): void {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxHeight: '90vh',
      maxWidth: '600px',
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        Notiflix.Loading.hourglass();
        this.delete<%= classify(name) %>GQL
          .mutate({ <%= camelize(name) %>Id: id })
          .subscribe((result) => {
            Notiflix.Loading.remove();
            if (result.data.delete<%= classify(name) %>) {
              Notiflix.Notify.success('Suppression effectuée  avec succès');
              this.get<%= classify(name) %>s(false);
            }
          });
      }
    });
  }

  openDialogPublish(id: string): void {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxHeight: '90vh',
      maxWidth: '600px',
      width: '100%',
      data: {
        message: 'Veuillez confirmer la publication !',
        btnMessage: 'Publier',
      },
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        Notiflix.Loading.hourglass();
        this.publish<%= classify(name) %>GQL.mutate({ <%= camelize(name) %>Id: id }).subscribe({
          next: (result) => {
            Notiflix.Loading.remove();
            if (result.data.publish<%= classify(name) %>) {
              this.get<%= classify(name) %>s(false);

              Notiflix.Notify.success('Publication effectuée  avec succès');
            }
          },
          error: (error) => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(error.message);
          },
        });
      }
    });
  }

  openDialogUnPublish(id: string): void {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxHeight: '90vh',
      maxWidth: '600px',
      width: '100%',
      data: {
        message: 'Veuillez confirmer la dépublication !',
        btnMessage: 'Dépublier',
      },
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.unPublish<%= classify(name) %>GQL.mutate({ <%= camelize(name) %>Id: id }).subscribe({
          next: (result) => {
            if (result.data.unPublish<%= classify(name) %>) {
              this.get<%= classify(name) %>s(false);
              Notiflix.Notify.success('Dépublication effectuée  avec succès');
            }
          },
          error: (error) => {
            Notiflix.Notify.failure(error.message);
          },
        });
      }
    });
  }

  truncateString(str: string): string {
    str = str || '';
    const maxLength = 80;

    if (str.length <= maxLength) {
      return str;
    } else {
      let lastSpaceIndex = str.lastIndexOf(' ', maxLength);
      if (lastSpaceIndex === -1) {
        lastSpaceIndex = maxLength;
      }
      return str.substring(0, lastSpaceIndex) + '...';
    }
  }

  onOptionSelected(value: any) {
    this.selectedState = value;
  }
}
