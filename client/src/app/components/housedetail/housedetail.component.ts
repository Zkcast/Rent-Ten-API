import { loadPayment } from './../../redux/actions/location.actions';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { House } from '../../models/House';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { userProfile } from 'src/app/models/UserProfile';

@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css'],
})
export class HousedetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    public http: DataServiceService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    public auth: AuthService) { }

  userProfile: userProfile
  house: House
  profileJson: any
  paramsId: string
  form: FormGroup
  booking: boolean = false
  pagado: boolean;
  indexPhoto: number = 0
  paymentstatus: string;


  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.paramsId= params["id"];
      this.http
        .getHouse(this.paramsId)
        .subscribe((data) => (this.house = data));
    });

    this.auth.user$.subscribe((res) => {
      this.profileJson = res
      this.http.getUser(this.profileJson.email).subscribe((res) => this.userProfile = res)
    })

    this.form = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    });
  }

  unavailableDays = (calendarDate: Date): boolean => {
    if (!this.house.Bookings) return true;
    return !this.house.Bookings.some(
      (d: Booking) =>
        calendarDate > new Date(d.start) &&
        calendarDate <=
        new Date(new Date(d.end).getTime() + 24 * 60 * 60 * 1000)
    );
  };

  goBack(): void {
    this.location.back();
  }

  giveMePhoto() {
    return this.house.picture[this.indexPhoto];
  }

  formatDate(date: string) {
    let split = date.split("/")
    let formatDate = split[2] + "-" + split[1] + "-" + split[0]
    return formatDate
  }

  checkItsOccuped(start: Date, end: Date) {
    console.log(this.house.Bookings)
    return this.house.Bookings.some(
      (d: Booking) =>
        start < new Date(d.start) &&
        end >
        new Date(new Date(d.end).getTime() + 24 * 60 * 60 * 1000)
    )
  }

  reserveHouse(): void {

    let start = this.form.value.daterange.start
    let end = this.form.value.daterange.end

    if (!start || !end) { alert("Please select both dates"); return }
    if (this.checkItsOccuped(start, end)) { alert('This place has bookings between your selected dates. Please make two bookings or change your dates'); return 
  
    } else {
    let transactionCode = Math.random().toString(36).slice(4)
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // let startDate = this.formatDate(start.toLocaleDateString("en-GB", options))
    // let endDate = this.formatDate(end.toLocaleDateString("en-GB", options))
    // let newReserve = { start: startDate, end: endDate, reservedBy: this.userProfile.id, code: transactionCode }

    const newReserve = {
      start: this.formatDate(start.toLocaleDateString("en-GB", options)),
      end: this.formatDate(end.toLocaleDateString("en-GB", options)),
      reservedBy: this.userProfile.id,
      code: transactionCode
    }

    this.paymentstatus = 'loading'
    this.http.makeABook(this.house.id, newReserve, this.userProfile.id)
    this.getPreferenceId(transactionCode)
    }

  }


  // getPaymentLink(transactionCode: string) {

  //   const item = {
  //     title: `Booking for house with ID ${this.house.id}`,
  //     price: this.house.price,
  //     quantity: 1,
  //     email: this.userProfile.mail,
  //     userId: this.userProfile.id,
  //     houseId: this.house.id,
  //     code: transactionCode
  //   }

  //   this.http.getPaymentLink(item).subscribe(res => 
  //     window.open(`${res.init_point}`, '_blank'))

  // }

  getPreferenceId(transactionCode: string) {

    const item = {
      title: `Booking for house with ID ${this.house.id}`,
      price: this.house.price,
      quantity: 1,
      email: this.userProfile.mail,
      userId: this.userProfile.id,
      houseId: this.house.id,
      code: transactionCode
    }

    this.http.getPaymentLink(item).subscribe(res => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', res.id);
      const form = document.getElementById('payment-form');
      form?.appendChild(script);
      this.paymentstatus = 'ready'
    }
    )

  }

  getPaymentLink() {

    const item = {
      title: `Booking for house with ID ${this.house.id}`,
      price: this.house.price,
      quantity: 1
    }
    
    this.http.getPaymentLink(item).subscribe(res => 
      window.open(`${res.init_point}`, '_blank'))

    this.reserveHouse()
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
