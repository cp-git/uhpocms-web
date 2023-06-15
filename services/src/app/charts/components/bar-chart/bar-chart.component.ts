
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Chart, ChartOptions, LinearScaleOptions, registerables, TooltipItem } from 'chart.js';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-zoom';

Chart.register(ChartDataLabels);
Chart.register(...registerables);
let plugin = ({
  id: 'custom_canvas_background_color',
  beforeDraw: function (chart: { chart: { width?: number; height?: number; ctx: any; }; options: { plugins: { custom_canvas_background_color: { text: string; font: string; color: string; textAlign: string; textBaseline: string; padding: number; }; }; }; }) {
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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {

  constructor(private courProgServ: CourseProgressService) {

  }
  @Output() clickData: EventEmitter<{ value: any; label: string }> = new EventEmitter();

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  chart: any;
  labels: String[] = [];
  @ViewChild('bChart', { static: false })
  bChart!: ElementRef;
  @Input() jsonArray: any = [15, 20];
  @Input() chartLabels: any = [
    '0-25', '26-50', '51-75', '76-100'

  ];
  @Input() cutOut: number = 75;
  @Input() backgroundColors: any = [
    "#eeff6a", "#f0b8b8", "#57d286", "#6f7dee"

  ];

  // -------------------------------------------------------------------------------------------
  ngAfterViewInit() {


    let cvs: any;
    cvs = this.bChart.nativeElement;






    this.chart = new Chart(cvs, {
      type: 'bar',
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
       
       
    
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const index = element.index;

            // Call a function to display the popup
            this.displayPopup(datasetIndex, index);
          }
        },

        plugins: {

          zoom: {
            zoom: {
              wheel: {
                enabled: true, // Enable zooming with the mouse wheel
              },

              mode: 'xy', // Enable zooming on both axes (x and y)
            },
          },
          datalabels: {
            anchor: 'center', // Display the labels at the end of the bars
            align: 'center', // Display the labels at the top of the bars
            font: {
              size: 12,
              weight: 'bold',
            },
            formatter: function (value, context) {
              // return Math.round(value) + '%';


              return value;
            },
            color: 'black'
          },
          legend: {
            display: false,
          }

          //       position: 'top',
          //       align: 'start',
          //       labels: {
          //         boxWidth: 10,

          //         padding: 10,
          //         generateLabels: (chart) => {
          //           return this.chartLabels.map((label: any,index: number) => ({
          //             text: label,
          //             fillStyle:this.backgroundColors[index], // Customize the legend text color
          //           }));
          //   }

          //   }
          // } ,

        },



      }



    });


    console.log(this.chart)
  }





  //function to display popup on click of bar
  displayPopup(datasetIndex: number, index: number) {
    // Get the data or other information associated with the clicked bar
    // const value = this.chart.data.datasets[datasetIndex].data[index];
    const value = this.chart.data;
    const label = this.chart.data.labels[index];

    // Use the retrieved data to display a popup or perform any desired action
    console.log(`Clicked bar: ${label} - Value: ${value}`);
    // Show your popup or perform other actions here
    this.click.emit();
    this.clickData.emit({ value, label });
  }

}
