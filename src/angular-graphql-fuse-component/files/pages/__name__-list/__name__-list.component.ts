import { AfterViewInit, Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import Notiflix from 'notiflix';
import { getModalSize } from 'app/shared/utils/sugar-codes.helper';
import { <%= classify(name) %>FormComponent } from '../../components/<%= dasherize(name) %>-form/<%= dasherize(name) %>-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { <%= classify(name) %>, Fetch<%= classify(name) %>sGQL, Fetch<%= classify(name) %>sQuery } from 'graphql/generated';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { merge } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Component({
    selector     : 'app-<%= dasherize(name) %>-list',
    standalone   : true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        NgClass,
        MatMenuModule,
        ReactiveFormsModule,
    ],
    templateUrl  : './<%= dasherize(name) %>-list.component.html',
    styleUrl: './<%= dasherize(name) %>-list.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class <%= classify(name) %>ListComponent implements AfterViewInit {
    displayedColumns: string[] = ['name', 'action'];
    dataSource: MatTableDataSource<<%= classify(name) %>> = new MatTableDataSource([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private fetch<%= classify(name) %>sGQL = inject(Fetch<%= classify(name) %>sGQL);
    private fb = inject(FormBuilder);
    private dialog = inject(MatDialog);
    screenWidth: number = window.innerWidth;
    <%= camelize(name) %> = [];
    searchForm = this.fb.group({
        search: ['']
    });
    searchControl = new FormControl()
    totalItems: number;

    load<%= classify(name) %>() {
        return this.fetch<%= classify(name) %>sGQL.fetch({
            queryConfig: {
                limit: this.paginator?.pageSize || 10,
                page: this.paginator?.pageIndex + 1 || 0 ,
                search: this.searchControl.value
            }
        }, { fetchPolicy: 'no-cache' });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        merge(
            this.paginator.page, // Quand le paginator change
          )
          .pipe(
            startWith({}),
            switchMap(() => {
              return this.load<%= classify(name) %>();
            })
          )
          .subscribe(result => {
            this.setupData(result.data);
          });

          merge(
            this.searchControl.valueChanges.pipe(debounceTime(300)) // Quand la recherche change avec un debounce de 300ms
          )
          .pipe(
            startWith({}),
            switchMap(() => {
                this.paginator.firstPage();
                return this.load<%= classify(name) %>();
            })
          )
          .subscribe(result => {
            this.setupData(result.data);
          });
    }

    setupData(data: Fetch<%= classify(name) %>sQuery) {
        this.<%= camelize(name) %> = data.fetch<%= classify(name) %>s.results;
        this.dataSource = new MatTableDataSource(this.<%= camelize(name) %>);
        this.totalItems = data.fetch<%= classify(name) %>s.pagination.totalItems;
    }

    openForm(id?: string): void {
        const width = getModalSize(this.screenWidth);
        const dialogRef = this.dialog.open(<%= classify(name) %>FormComponent, {
            width: width,
            height: width == '100%' ? width : '',
            data: id ? this.<%= camelize(name) %>.find((x) => x.id == id) : null,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.load<%= classify(name) %>().subscribe(result => {
                    this.setupData(result.data);
                });
            }
        });
    }
}

