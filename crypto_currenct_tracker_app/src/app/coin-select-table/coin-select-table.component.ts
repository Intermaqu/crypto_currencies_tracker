import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CoinSelectTableDataSource } from './coin-select-table-datasource';
import {CoinBasicInfo} from '../models';
import { CoinDetailDialog } from '../dialog/coin-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CryptoApiService } from '../crypto-api.service';

@Component({
  selector: 'app-coin-select-table',
  templateUrl: './coin-select-table.component.html',
  styleUrls: ['./coin-select-table.component.scss']
})
export class CoinSelectTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CoinBasicInfo>;
  @Input() response: CoinBasicInfo[] = [];

  dataSource: MatTableDataSource<CoinBasicInfo> = [] as any;
  favorites: CoinBasicInfo[] = [];
  isFavoriteCoinsDisplayed: boolean = false;
  displayedColumns = ['id', 'name', "symbol", "actions"];
  
  constructor(public dialog: MatDialog, private cryptoApiService: CryptoApiService){
  }

  isFavoriteCoin(coin: CoinBasicInfo){
    return this.favorites.find(fav => fav.id === coin.id);
  }

  inspectCoin(coin: CoinBasicInfo){
    console.log("INSPECTING:", coin);
  
    this.cryptoApiService.getCoinDetails(coin.id).subscribe((coinDetails: any) => {
      console.log("COIN DETAILS:", coinDetails);
      const dialogRef = this.dialog.open(CoinDetailDialog, {
        data: coin
      })

      // dialogRef.afterClosed().subscribe((result: any) => {
      //   console.log(`Dialog result: ${result}`);
      // });
    });

  }

  filterCoins(event: Event){
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("FILTERING:", filterValue);
  }
  
  toggleFavoriteCoin(coin: CoinBasicInfo){
    if(this.favorites.find(fav => fav.id === coin.id)){
      this.favorites = this.favorites.filter(fav => fav.id !== coin.id);
    } else {
      this.favorites.push(coin);
    }

    console.log("FAVORITES:", this.favorites)

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  toggleDisplayFavoriteCoins(){
    if (this.isFavoriteCoinsDisplayed) {
      this.isFavoriteCoinsDisplayed = false;
      // Use MatTableDataSource to wrap your data
      this.dataSource = new MatTableDataSource<CoinBasicInfo>(this.response);
    } else {
      this.isFavoriteCoinsDisplayed = true;
      // Use MatTableDataSource to wrap your data
      this.dataSource = new MatTableDataSource<CoinBasicInfo>(this.favorites);
    }

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    // this.dataSource = new CoinSelectTableDataSource(this.favorites);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  ngOnInit(){
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }



  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<CoinBasicInfo>(this.response);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log("ABC:", this.response);
  }
}
