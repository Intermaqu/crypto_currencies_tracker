import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CoinBasicInfo } from '../models';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { timestampToTime, timestampToDate } from "./utils"
import { ChartComponent } from '../chart/chart.component';


@Component({
    selector: 'coin-details-dialog.component',
    templateUrl: 'coin-details-dialog.component.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, CanvasJSAngularChartsModule, ChartComponent]
})

export class CoinDetailDialog {
    coin: CoinBasicInfo = {
        id: "",
        name: "",
        symbol: ""
    }
    coinDetails: any = {}
    coinPricing: any = {}
    pricing: any = []
    beforeFilterPricing: any = []
    isLoaded: boolean = false
    period: "hour" | "day" = "hour"
    chart: any;    

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ){

        this.coin = data.coin;
        this.coinDetails = data.coinDetails
        this.coinPricing = data.coinPricing
        // console.log(this.coinDetails)
        // console.log(this.coinPricing)

        this.pricing = data.coinPricing.prices.map((price:[number, number])=> {
            return {x: timestampToDate(price[0]), y: price[1]}})
        
        this.beforeFilterPricing = this.pricing

        this.isLoaded = true
    }

    setPeriod(period: "hour" | "day"){
        this.period = period
        if(period === "hour"){
            this.pricing = this.beforeFilterPricing.slice(-12)
        } else {
            this.pricing = this.beforeFilterPricing
        }
    }


}