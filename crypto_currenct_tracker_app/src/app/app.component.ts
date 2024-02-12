import { Component } from '@angular/core';
import { CryptoApiService } from "./crypto-api.service"
import { CoinBasicInfo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  response: CoinBasicInfo[] = [];
  isLoaded: boolean = false;
  isSelect: boolean = false;

  toggleSelect(){
    this.isSelect = !this.isSelect;
  }

  constructor(private cryptoApiService: CryptoApiService) { 
    this.cryptoApiService.getAllCoins().subscribe((response) => {
      this.response = response;
      this.isLoaded = true;
      // console.log(this.response);
    }, (error) => {
      this.response = [];
      console.error(error);
    })
  }

  ngOnInit() { }

}

