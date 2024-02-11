import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoinBasicInfo } from './models'

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  constructor(private http: HttpClient) { }
  URL = 'https://api.coingecko.com/api/v3';

  getAllCoins(): Observable<CoinBasicInfo[]> {
    return this.http.get<CoinBasicInfo[]>(`${this.URL}/coins/list`);
  }

  getCoinDetails(coinId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/coins/${coinId}`);
  }

  getCoinMarketData(coinId: string): Observable<any> {
    // https://api.coingecko.com/api/v3/coins/01coin/market_chart?vs_currency=usd&days=1
    return this.http.get<any>(`${this.URL}/coins/${coinId}/market_chart?vs_currency=usd&days=1`);
  }
}
