import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { FormGroup, NgForm } from '@angular/forms';
import { AppState } from './../../redux/store/app.state';
import { Observable } from 'rxjs';
import { loadedCountries } from './../../redux/actions/location.actions';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Component, OnInit,Inject } from '@angular/core';
import { UploadImgService } from 'src/app/services/upload-img.service';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { LocationService } from 'src/app/services/location.service';
import { selectorListCountries } from 'src/app/redux/selectors/selectors';
import { Location } from '@angular/common';

import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
export interface NewHouse {
  city: string;
  country: string;
  state: string;
  rooms: number;
  bathrooms: number;
  maxpeople: number;
  allowpets: boolean;
  wifi: boolean;
  type: string;
  picture: string[];
  price: number;
}

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.scss'],
  providers: [UploadImgService],
})
export class CreateHouseComponent implements OnInit {
  //Local Variables
  newHouse: NewHouse = {
    city: '',
    country: '',
    state: '',
    rooms: 1,
    bathrooms: 1,
    maxpeople: 1,
    allowpets: false,
    wifi: false,
    price: 0,
    type: '',
    picture: [],
  };

  selectedCountry: any = { name: 'arg' };
  files: File[] = [];
  email: string = '';
  countries$: Observable<any> = new Observable();

  states$: any;
  cities$: any;
  //TODO: hacer una interface para los errores
  //ponerlo en true cuando el form este controlado
  errors:any =false

  constructor(
    private _uploadImg: UploadImgService,
    private _http: DataServiceService,
    public _auth: AuthService,
    private _store: Store<AppState>,
    private _locationService: LocationService,
    private matDialog: MatDialog,
    private _location:Location,
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((profile) => {

      this.email = profile?.email ? profile?.email : '';
    });

    this.countries$ = this._store.select(selectorListCountries);

    this._locationService.getCountries().subscribe((response) => {
      this._store.dispatch(loadedCountries({ countries: response.data }));
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {}
    let dialogRef =this.matDialog.open(DialogBodyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  onSelect(event: any) {

    if (this.files.some((e) => e.name === event.addedFiles[0].name)) {
      return;
    }
    this.files.push(...event.addedFiles);
    this.errors=false
  }

  searchStates(country: string) {
    this._locationService.getState(country).subscribe((response) => {
      this.states$ = response.data.states;
    });
  }
  searchCities(state: string) {
    this._locationService
      .getCities(this.newHouse.country, state)
      .subscribe((response) => {
        this.cities$ = response.data;
      });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(create: NgForm) {
    this.onUpload(create);
  }

  onUpload(create: NgForm) {
    if (!this.files[0]) {
      alert('Ingresa al menos una foto de portada');
      return;
    }

    this.files.forEach((image) => {
      const data = new FormData();
      data.set('file', image);
      data.set('upload_preset', 'h4e9cy2g');
      data.set('cloud_name', 'dbgpp8nla');

      this._uploadImg.uploadImage(data).subscribe((response) => {
        this.newHouse.picture?.push(response.secure_url);
        if (this.files.length === this.newHouse.picture.length) {
          this._http.createHouse(this.newHouse, this.email);
          this.files=[]
          create.resetForm()
        }
      });
    });
  }

  get currentHouse() {
    return JSON.stringify(this.newHouse);
  }

  handlePrice(price:number){
    if(price <= 0){
      this.newHouse.price = 0
    }

  }
  handleType(e:string){
    this.newHouse.type= e;

  }



  //Add and less number
  handlePLusAndMinus(operator: string, name: string) {
    switch (name) {
      case 'bathrooms':
        if (this.newHouse.bathrooms === 1 && operator === '+') {
          this.newHouse.bathrooms++;
        } else if (this.newHouse.bathrooms >= 2) {
          operator === '+'
            ? this.newHouse.bathrooms++
            : this.newHouse.bathrooms--;
        } else {
          this.newHouse.bathrooms = 1;
        }
        break;

      case 'rooms':
        if (this.newHouse.rooms === 1 && operator === '+') {
          this.newHouse.rooms++;
        } else if (this.newHouse.rooms >= 2) {
          operator === '+' ? this.newHouse.rooms++ : this.newHouse.rooms--;
        } else {
          this.newHouse.rooms = 1;
        }
        break;
      case 'maxpeople':
        if (this.newHouse.maxpeople === 1 && operator === '+') {
          this.newHouse.maxpeople++;
        } else if (this.newHouse.maxpeople >= 2) {
          operator === '+'
            ? this.newHouse.maxpeople++
            : this.newHouse.maxpeople--;
        } else {
          this.newHouse.maxpeople = 1;
        }
        break;
    }
  }
}
