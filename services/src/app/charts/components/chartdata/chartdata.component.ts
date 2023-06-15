import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart ,registerables} from 'chart.js';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';

import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);
Chart.register(...registerables);




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
    "#55B4B0",  "#E15D44"
 
  ];
  

  ngAfterViewInit() {
    
    console.log("json array in chhartdata")
    console.log(this.jsonArray)
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
      
               
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              if (value == 0) {
                return ' ';
              } else {
                return Math.round(value) + '%';
              }
            },
          
            color: 'black',
            font: {
              size: 12,
              weight: 'bold',
            },
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 12,
                weight: 'bold' // Set the font weight of the legend labels to bold
              }
            }
          }

     
        }
      }
    });
    
    
  

}



}