import { Component, Inject, Input } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  imports: [CanvasJSAngularChartsModule],
  standalone: true
})
export class ChartComponent {
  @Input() pricing: {x: number, y:number}[] = []



  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Prices",
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      fontWeight: "bold"
    },
    axisY: {
      title: "Prices[$]",
    },
    data: [{
      type: "spline",
      xValueFormatString: "HH.MM",
      yValueFormatString: "#,###.###'$'",
      dataPoints: this.pricing
    }]}

}
