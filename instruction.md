# Frontend Anleitung

## Tabellenansicht

! Einzahl und Mehrzahl beachten bei den Ressourcen

```bash
cd components
ng g c <Examples>
```

Bei [App Routing](src/app/app-routing.module.ts) neue route hinzufügen:

```js
  {
    path: 'examples',
    title: 'examples',
    component: ExamplesComponent,
  },
```

Bei [Navbar](src/app/components/navbar/navbar.component.ts) Menupünkt hinzufügen

```js
  routeOptions: RouteOption[] = [
    { path: '/patients', displayName: 'Patients' },
    { path: '/practitioners', displayName: 'Practitioners' },
    { path: '/condition', displayName: 'Condition' },
    //füge hier den neuen Pfad ein
  ];
```

Probier aus ob der Menüpunkt bei der Navbar auch geht

API Route der neuen Ressource defnieren [hier](src/app/constants/index.ts)

```js
export const apiEndpoints = {
  patient: `${BASE_URL}/patient`,
  practitioner: `${BASE_URL}/practitioner`,
  condition: `${BASE_URL}/condition`,
  //neuen API Endpunkt festelgen
};
```

Komponente für die Detailansicht erstellen

```bash
ng g c <Example>
```

Bei der Typescript datei der Tabellensübersichts Komponente bei @Component

```js
  imports: [CommonModule, ExampleComponent],
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.example, // dein vorher definierten endpunk einfügen
    },
    ResourceService,
    ],

```

```js
export class ExamplesComponent implements OnInit {
  constructor(private service: ResourceService<Example>) {}

  examplesArr$: Example[] = [];
  selectedExample: Example = {} as Example;

  ngOnInit(): void {
    this.getExample();
  }

  getExample() {
    this.service.getAll().subscribe((data: Example[]) => {
      console.log(data);
      this.examplesArr$ = data;
    });
  }

  selectExample(selected: Example) {
    console.log('clicked Example' + selected.id);
    this.selectedExample = selected;
  }

  onExampleModified(updated: boolean) {
    console.log('Example modified ' + updated);
    if (updated) {
      this.selectedExample = {} as Example;
    }
    this.getExample();
  }

  createExample() {
    const newExample: Example = {} as Example;
    console.log(newExample);
    this.service.addOne(newExample).subscribe((Example) => {
      this.onExampleModified(true);
    });
  }
}
```

HTML für die Ressource Tabellenansicht

```html
<div class="container my-3">
  <table class="table table-hover table-striped table-responsive">
    <thead class="table-info">
      <tr>
        <th>Id</th>
        <!-- Hier weitere Überschriften für Attributen einfügen-->
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let example of examplesArr$" (click)="selectExample(example)" style="cursor:pointer; margin: 0;">
        <td>{{example.id}}</td>
        <!-- Hier weitere Attribute einfügen -->
      </tr>
    </tbody>
  </table>

  <button (click)="createExample()" type="button" class="btn btn-success"><i class="bi bi-plus-lg"></i> Add Example</button>

  <div *ngIf="selectedExample.id">
    {{selectedExample.id}}
    <app-example [id]="selectedExample.id" (exampleModified)="onExampleModified($event)"></app-example>
  </div>
</div>
```

## Detailansicht
