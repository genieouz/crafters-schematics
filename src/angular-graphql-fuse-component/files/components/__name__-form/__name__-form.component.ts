import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Create<%= classify(name) %>GQL, Update<%= classify(name) %>GQL } from 'graphql/generated';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-<%= dasherize(name) %>-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    NgClass,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatDatepickerModule,
    NgClass
  ],
  templateUrl: './<%= dasherize(name) %>-form.component.html',
  styleUrl: './<%= dasherize(name) %>-form.component.scss'
})
export class <%= classify(name) %>FormComponent {
    private create<%= classify(name) %>GQL = inject(Create<%= classify(name) %>GQL);
    private update<%= classify(name) %>GQL = inject(Update<%= classify(name) %>GQL);
    formFieldHelpers: string[] = [''];
    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<<%= classify(name) %>FormComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any
    ) {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
        });
        if(this.data) {
            this.form.patchValue(this.data);
        }
    }

    submit() {
        if(this.form.invalid) {
            return;
        }
        if(this.data?.id) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        this.create<%= classify(name) %>GQL.mutate({ <%= camelize(name) %>Input: this.form.value }).subscribe(
            result => {
                Notiflix.Notify.success('Ajout effectuée avec succès');
                this.dialogRef.close(result);
            },
            err => {
                Notiflix.Report.failure(
                    'Erreur lors de la création',
                    err.error.message,
                    'OK'
                );
            }
        )
    }

    update() {
        this.update<%= classify(name) %>GQL.mutate({ <%= camelize(name) %>Input: this.form.value, <%= camelize(name) %>Id: this.data.id }).subscribe(
            result => {
                Notiflix.Notify.success('Modification effectuée avec succès');
                this.dialogRef.close(result);
            },
            err => {
                Notiflix.Report.failure(
                    'Erreur lors de la modification',
                    err.error.message,
                    'OK'
                );
            }
        )
    }
}
