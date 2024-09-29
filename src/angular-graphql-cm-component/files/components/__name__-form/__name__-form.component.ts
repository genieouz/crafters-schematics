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
import { Router } from '@angular/router';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { MultiSelectModule } from 'src/app/shared/components/multi-select/multi-select.module';
import { DropdownModule } from 'src/app/shared/directives/dropdown/dropdown.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { EditorConfig } from 'src/app/shared/utils/angular-editor-configuration';
import { SelectOptions } from 'src/app/shared/utils/selec-options';
import { environment } from 'src/environments/environment';
import { <%= classify(name) %>, Fetch<%= classify(name) %>GQL } from 'src/graphql/generated';

@Component({
  selector: 'app-<%= dasherize(name) %>-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    MaterialModule,
    FlexLayoutModule,
    MultiSelectModule,
    DropdownModule,
  ],
  templateUrl: './<%= dasherize(name) %>-form.component.html',
  styleUrls: ['./<%= dasherize(name) %>-form.component.scss'],
})
export class <%= classify(name) %>FormComponent implements OnChanges {
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
  fetch<%= classify(name) %>GQL = inject(Fetch<%= classify(name) %>GQL)

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackbarService: SnackBarService,
    private router: Router
  ) {
    this.getListData();
    this.<%= camelize(name) %>Form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required],
      description: ['', Validators.required],
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
    this.fetch<%= classify(name) %>GQL
      .fetch({ <%= camelize(name) %>Id: this.<%= camelize(name) %>Id }, { fetchPolicy: 'no-cache' })
      .subscribe((result) => {
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
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          ...this.<%= camelize(name) %>Form.value,
          media_type: this.mediaType,
        })
      );
      formData.append('poster', this.poster);
      this.http.post(this.apiUrl, formData).subscribe(
        (response) => {
          this.snackbarService.showSuccessSnackBar(
            'Démarche ajouté avec succés'
          );
          this.router.navigate(['/<%= camelize(name) %>s/list']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  update() {
    if (this.<%= camelize(name) %>Form.valid && this.<%= camelize(name) %>Id) {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          ...this.<%= camelize(name) %>Form.value,
          media_type: this.mediaType,
        })
      );
      formData.append('poster', this.poster);
      this.http.put(`${this.apiUrl}/${this.<%= camelize(name) %>Id}`, formData).subscribe(
        (response) => {
          this.snackbarService.showSuccessSnackBar(
            'Démarche modifié avec succés'
          );
          this.router.navigate(['/<%= camelize(name) %>s/list']);
        },
        (error) => {
          console.error(error);
        }
      );
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
