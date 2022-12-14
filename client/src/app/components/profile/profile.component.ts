import { UploadImgService } from 'src/app/services/upload-img.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import { userProfile } from '../../models/UserProfile';
import { House } from '../../models/House';
import { catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorListBackup, selectorListProfile } from 'src/app/redux/selectors/selectors';
import { addFavoriteHouse, changeVerifiedStatusProfile, loadHouses, loadProfile } from 'src/app/redux/actions/location.actions';
import { Review } from 'src/app/models/Review';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})


export class ProfileComponent implements OnInit {

  allHouses$: Observable<any> = new Observable();
  dbProfile: userProfile;
  allHouses: House[] = [];
  favoritesHouses: House[] = [];
  profileJson: any;
  error: any;
  files: File[] = [];
  userProfile$: Observable<any> = new Observable();
  userProfile: userProfile;
  favoritesHouses$: Observable<any> = new Observable();
  profileImg: string;
  reviewsHouses: Review[] = [];
  housesProfile: House[] = []


  constructor(public auth: AuthService,
    private http: DataServiceService,
    private store: Store<any>,
    private _uploadImg: UploadImgService,
    private localStorageSvc: LocalStorageService,
    private _router: Router,
    ) {
  }

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectorListProfile)
    this.allHouses$ = this.store.select(selectorListBackup)
    this.loadProfile()
    this.loadHouses_n_favorites()
  }



  loadProfile() {
    this.userProfile$.subscribe(profile => {
      if (profile.length === 0) {
        this.auth.user$.subscribe(profile => {
          this.profileJson = profile;
          this.http.getUser(this.profileJson.email).subscribe(res => {
            this.store.dispatch(loadProfile({ userProfile: res }))
            this.userProfile = res
          });
        })
      } else {
        this.userProfile = profile
      }
    });

  }

  loadHouses_n_favorites() {
    this.allHouses$.subscribe(houses => {
      if (houses.length === 0) {
        this.http.getHouses().subscribe(data => {
          this.store.dispatch(loadHouses({ allHouses: data }));
          this.allHouses = data;
        })
      } else {
        this.allHouses = houses
      }

      // this.userProfile$.subscribe((res) => {
      //   let favoritesLS = this.localStorageSvc.getFavoritesHouses()
      //   this.favoritesHouses = this.allHouses.filter((house: House) => (res.favoriteshouses!.concat(favoritesLS).some((h: string) => h == house.id)))
      //   favoritesLS.forEach((houseId:string) => {
      //     this.setFavorite(houseId, res.id)
      //   })
      //   localStorage.clear()
      // })

      this.userProfile$.subscribe((res) => {
        this.favoritesHouses = this.allHouses.filter((house: House) => (res.favoriteshouses!.some((h: string) => h == house.id)))
      })


    })
  }

  deleteFavorite(houseId: string, userId: string): void {
    this.http.deleteFavorite(houseId, userId)
    this.favoritesHouses = this.favoritesHouses.filter(house => house.id !== houseId)
    this.localStorageSvc.removeFavorite(houseId)


  }

  showProfileJson(): void {
    console.log(this.userProfile)
    console.log(this.favoritesHouses)
    console.log("Console Revw: ", this.reviewsHouses)
  }

  verifyAccount(): void {

    //this.dbProfile.verified = 'pending'
    this.store.dispatch(changeVerifiedStatusProfile({ payload: 'pending' }))
    this.http.verifyAccount(this.dbProfile.mail)
  }

  sendVerificationCode(code: string): any {
    this.http.getUser(this.profileJson.email).subscribe(data => this.dbProfile = data);
    this.http.sendVerificationCode(this.profileJson.email, code)
      .pipe(catchError((error): any => { this.error = error.error.msg }))
      .subscribe(data => {
        this.dbProfile.verified = 'verified'
        this.store.dispatch(changeVerifiedStatusProfile({ payload: 'verified' }))
      })

  }
  onFileSelected(event: any): void {
    const data = new FormData();
    data.set('file', event.path[0].files[0]);
    data.set('upload_preset', 'h4e9cy2g');
    data.set('cloud_name', 'dbgpp8nla');

    this._uploadImg.uploadImage(data).subscribe(res => {
      this.http.updateProfilePicture(res.secure_url, this.userProfile.id, this.userProfile.sub);

      this.userProfile = { ...this.userProfile, picture: res.secure_url };

      // TODO: RAUL -DANGER aca se produce un bucle de llamadas- arreglando
      this.store.dispatch(loadProfile({ userProfile: this.userProfile }));


    });
  }

  // setFavorite(houseId: string, userId: string): void {
  //     this.http.setFavorite(houseId, userId)
  //     this.store.dispatch(addFavoriteHouse({ payload: houseId }))
  // }

    goTo(id:string){
         //this._router.navigate([`home/housedetail/${id}`])//TODO: Redireccionar casa creada a detail
    }


}

export class NgbdAccordionBasic { }
export class SectionModule { }

