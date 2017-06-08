import { Subscription } from 'rxjs/Rx';
import { WebsocketService } from './../../../websocket.service';
import { RealtimeChart } from './../../../realtime-chart';
import { Component, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import {
  Barchart,
  Gauge,
  Heatmap,
  Linechart,
  Scatterplot,
  StackedArea,
  Streamgraph,
  Sunburst,
  Swimlane,
  Colors
} from 'proteic';

@Component({
  selector: 'proteic',
  styleUrls: ['./proteic.scss'],
  templateUrl: './proteic.html',
})
export class Proteic implements OnInit, AfterViewInit, OnDestroy {

  private id: string;
  private element: any;
  private dataSubscriptions: Subscription[] = new Array<Subscription>();


  @Input() private chart: RealtimeChart;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    //console.log('Chart in proteic', this.chart);

    this.id = 'proteic' + Date.now().toString();
    this.chart.configuration.marginRight = 100;
    this.chart.configuration.marginBottom = 50;
    this.chart.configuration.marginLeft = 70;
    this.chart.configuration.marginTop = 35;
    this.chart.configuration.selector = '#' + this.id;
    //this.chart.configuration.height = 250;
    this.chart.configuration.nullValues = ['NULL', 'NUL', '\\N', NaN, null, 'NaN'];
    this.chart.configuration.propertyX = 'x';
    this.chart.configuration.propertyY = 'value';
    this.chart.configuration.propertyKey = 'key';
    this.chart.configuration.legendPosition = 'top';
    this.chart.configuration.maxNumberOfElements = 300;
  }

  ngAfterViewInit(): void {
    let c = null;

    let unpivot = this._calculateUnpivotArray(this.chart);

    console.log('generated unpivot', unpivot);

    switch (this.chart.type) {
      case 'Barchart':
        c = new Barchart([], this.chart.configuration).unpivot(unpivot);
        break;
      case 'Gauge':
        c = new Gauge([], this.chart.configuration).unpivot(unpivot);
        break;
      case 'Heatmap':
        c = new Heatmap([], this.chart.configuration).unpivot(unpivot);
        break;
      case 'Linechart':
        c = new Linechart([], this.chart.configuration).annotations(this.chart.annotations)
          .unpivot(unpivot);
        break;
      case 'Network':
        break;
      case 'Scatterplot':
        c = new Scatterplot([], this.chart.configuration).unpivot(unpivot);
        break;
      case 'StackedArea':
        c = new StackedArea([], this.chart.configuration).unpivot(unpivot);
        break;
      case 'Streamgraph':
        break;
      case 'Sunburst':
        break;
      case 'Swimlane':
        break;
      default:
        break;
    }

    setTimeout(() => {
      for (const websocketEndpoint of this.chart.endpoints) {
        console.debug('Subscribing to: ', websocketEndpoint);
        const subs = this.websocketService.subscribe(websocketEndpoint);
        let subscription = subs.subscribe((data: any) => {
          let json = JSON.parse(data);
          //console.log(json);
          if (typeof json.type !== 'undefined') { //Check if it is a real-time value. If so, add a key.
            json.key = 'VAR' + json.varName;
          }

          //console.log('datum', json);
          c.keepDrawing(json);
        });

        this.dataSubscriptions.push(subscription);
      }
    }, 400);
  }

  ngOnDestroy() {
    for (let s of this.dataSubscriptions) {
      s.unsubscribe();
    }
  }


  private _calculateUnpivotArray(chart: RealtimeChart): string[] {
    let unpivot = new Array<string>();
    for (const c of this.chart.calculations) {
      if (c.value !== 'raw') {
        unpivot.push(c.value);
      }
    }
    return unpivot;
  }
}

