import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CoinBasicInfo } from '../models';


@Component({
  selector: 'coin-details-dialog.component',
  templateUrl: 'coin-details-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})

export class CoinDetailDialog {
    coin: CoinBasicInfo = {
        id: "",
        name: "",
        symbol: ""
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CoinBasicInfo
    ){
        this.coin = data;
    }
}