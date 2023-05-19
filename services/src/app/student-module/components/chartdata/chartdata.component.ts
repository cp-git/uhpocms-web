import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart ,registerables} from 'chart.js';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';

import ChartDataLabels from 'chartjs-plugin-datalabels';
// import * as ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
Chart.register(...registerables);
let plugin = ({
  id: 'custom_canvas_background_color',
  beforeDraw: function(chart: { chart: { width?: number; height?: number; ctx: any; }; options: { plugins: { custom_canvas_background_color: { text: string; font: string; color: string; textAlign: string; textBaseline: string; padding: number; }; }; }; }) {
    if (chart && chart.chart && chart.chart.width && chart.chart.height) {
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx,
          centerText = chart.options.plugins.custom_canvas_background_color;
      if (centerText && centerText.text) {
        ctx.save();
        ctx.font = centerText.font;
        ctx.fillStyle = centerText.color;
        ctx.textAlign = centerText.textAlign;
        ctx.textBaseline = centerText.textBaseline;
        ctx.fillText(centerText.text, width / 2, height / 2 + centerText.padding);
        ctx.restore();
      }
    }
  }
});

Chart.register({
plugin
});

@Component({
  selector: 'app-chartdata',
  templateUrl: './chartdata.component.html',
  
  styleUrls: ['./chartdata.component.css']
})
export class ChartdataComponent {

  constructor(private courProgServ : CourseProgressService){

  }

 

  chart: any;

  @ViewChild('dChart', { static: false })
  dChart!: ElementRef;
  @Input() jsonArray: any = [15,20];
  @Input() chartLabels: any = [
    'Completed'
    ,
    'Remaining'
    
  ];
  @Input() cutOut: number = 75;
  @Input() backgroundColors: any = [
    "#E15D44", "#55B4B0"
 
  ];
  //prev working code
  // ngAfterViewInit() {
  //   let cvs: any;
  //   cvs = this.dChart.nativeElement;
  //   this.chart = new Chart(cvs, {
  //     type: 'doughnut',
  //     data: {
  //       labels: this.chartLabels,
  //       datasets: [
  //         {
  //           data: this.jsonArray,
  //           backgroundColor: this.backgroundColors,
            
  //           borderWidth: 0,
  //         },
  //       ],
  //     },
      
  //     plugins: [ChartDataLabels],
  //     options: {
  //       plugins: {
  //         datalabels: {
  //           formatter: function(value, context) {
  //             return Math.round(value) + '%';
  //           },
  //           color: 'black'
  //         }
  //       }
  //     }
      
     
  //   });
  // }
  
  ngAfterViewInit() {
    
    
    let cvs: any;
    cvs = this.dChart.nativeElement;
    this.chart = new Chart(cvs, {
      type: 'doughnut',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.jsonArray,
            backgroundColor: this.backgroundColors,
            borderWidth: 0,
          },
        ],
      },
      plugins: [ChartDataLabels],
      options: {
        // responsive: false,
        // maintainAspectRatio: true,
        
               
        plugins: {
          datalabels: {
            formatter: function(value, context) {
              return Math.round(value) + '%';
            },
            color: 'black'
          },
     
        }
      }
    });
    
    
  

}



}