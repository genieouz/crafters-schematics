import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import Notiflix from 'notiflix';
import { EditorConfig } from 'src/app/shared/utils/angular-editor-configuration';
import { SelectOptions } from 'src/app/shared/utils/selec-options';
import { environment } from 'src/environments/environment';

import { <%= classify(name) %>, Fetch<%= classify(name) %>GQL } from 'src/graphql/generated';
import { <%= classify(name) %>FormComponent } from '../../components/<%= dasherize(name) %>-form/<%= dasherize(name) %>-form.component';
import { GoBackModule } from 'src/app/shared/directives/go-back/go-back.module';

@Component({
  selector: 'app-<%= dasherize(name) %>-create',
  standalone: true,
  imports: [
    CommonModule,
    AngularEditorModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    <%= classify(name) %>FormComponent,
    GoBackModule,
  ],
  templateUrl: './<%= dasherize(name) %>-create.page.html',
  styleUrl: './<%= dasherize(name) %>-create.page.scss',
})
export class <%= classify(name) %>CreatePage implements OnChanges {
  @Input() formTitle: string;
  @Input() <%= camelize(name) %>Id: string;
  @Input() type: string = 'create';
  content: string = '';
  editorConfig: AngularEditorConfig = EditorConfig;

  selectedValue: string;
  toggleBtnAction: boolean = false;

  states: any[] = SelectOptions.states;
  options: string[] = ['Apple'];
  servicesAdministratifs = [];
  textes = [];
  demarches = [];
  modeleLettres = [];
  descripteurs = [];
  <%= camelize(name) %>s = [];
  liensUtils = [];
  sousThemes = [];
  faqs = [];
  filteredOptions: string[] = this.options;
  searchTerm: string = '';
  selectedOptions: string[] = [];

  <%= camelize(name) %>Form: FormGroup;
  <%= camelize(name) %>: <%= classify(name) %>;
  apiUrl: string = `${environment.API_URI}/<%= camelize(name) %>`;
  poster: File;
  mediaPreview: string | ArrayBuffer | null;
  mediaType: 'image' | 'video' | null;
  fetch<%= classify(name) %>GQL = inject(Fetch<%= classify(name) %>GQL);
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,

    private router: Router
  ) {
    this.getListData();
    this.<%= camelize(name) %>Form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required],
      description: [''],
      inSpotlight: [false],
      published: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetch<%= classify(name) %>();
  }

  fetch<%= classify(name) %>() {
    if (!this.<%= camelize(name) %>Id) {
      return;
    }
    Notiflix.Loading.hourglass();
    this.fetch<%= classify(name) %>GQL
      .fetch({ <%= camelize(name) %>Id: this.<%= camelize(name) %>Id }, { fetchPolicy: 'no-cache' })
      .subscribe((result) => {
        Notiflix.Loading.remove();
        this.<%= camelize(name) %> = result.data.fetch<%= classify(name) %> as any;
        this.<%= camelize(name) %>Form.patchValue(this.<%= camelize(name) %>);
        this.mediaType = 'image';
        this.mediaPreview = this.<%= camelize(name) %>.poster;
      });
  }

  onSubmit() {
    if (this.type === 'create') {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    if (this.<%= camelize(name) %>Form.valid) {
      Notiflix.Loading.hourglass();
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          ...this.<%= camelize(name) %>Form.value,
          media_type: this.mediaType,
        })
      );
      formData.append('poster', this.poster);
      this.http.post(this.apiUrl, formData).subscribe({
        next: () => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success('Actualité ajoutée avec succès');
          this.router.navigate(['/<%= camelize(name) %>s/list']);
        },
        error: (error) => {
          Notiflix.Loading.remove();
          console.error(error);
          Notiflix.Notify.failure(error.message);
        },
      });
    }
  }

  update() {
    if (this.<%= camelize(name) %>Form.valid && this.<%= camelize(name) %>Id) {
      Notiflix.Loading.hourglass();
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          ...this.<%= camelize(name) %>Form.value,
          media_type: this.mediaType,
        })
      );
      formData.append('poster', this.poster);
      this.http.put(`${this.apiUrl}/${this.<%= camelize(name) %>Id}`, formData).subscribe({
        next: () => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success('Démarche mise à jour avec succès');
          this.router.navigate(['/dashboard/<%= camelize(name) %>s']);
        },
        error: (error) => {
          Notiflix.Loading.remove();
          console.error(error);
          Notiflix.Notify.failure(error.message);
        },
      });
    }
  }

  // Handler pour les changements de attachments
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.poster = file;
    }
  }

  changePoster(event: any): void {
    const input = event.target;
    if (!input.files.length) {
      return;
    }
    const file = input.files[0];
    const maxFileSize = 50 * 1024 * 1024; // Taille maximale autorisée en octets (100 Mo)
    this.poster = file;
    if (file && file.size < maxFileSize) {
      const reader = new FileReader();

      reader.onload = () => {
        this.mediaPreview = reader.result;
        console.log(this.mediaPreview);
        // Vérifier le type du fichier
        if (file.type.startsWith('image')) {
          this.mediaType = 'image';
        } else if (file.type.startsWith('video')) {
          this.mediaType = 'video';
          (document.getElementById('poster') as HTMLVideoElement).volume = 0.1;
        } else {
          // Gérer d'autres types de fichiers si nécessaire
          console.log('Type de fichier non pris en charge');
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // Méthode pour filtrer les options en fonction du terme de recherche
  filterOptions(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(searchTerm)
    );
  }

  //Méthode pour ajouter une option
  selectOption(option: string) {
    this.searchTerm = '';
    this.filteredOptions = this.options;

    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  isAllreadySelected(opt: string) {
    const index = this.selectedOptions.indexOf(opt);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  removeOption(str: string) {
    this.selectedOptions = this.selectedOptions.filter((item) => item !== str);
  }

  getListData() {
    this.fetch<%= classify(name) %>();
  }
}
