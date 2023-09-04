import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';



Chart.register(ChartDataLabels);
Chart.register(...registerables);


@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.css']
})
export class PolarChartComponent {

  /******************Variable Declarations*******************/
  @Output() clickData: EventEmitter<{ value: any; label: string }> = new EventEmitter();
  @Output() zeroCourses: EventEmitter<{ value: any; label: string }> = new EventEmitter();
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  chart: any;
  @ViewChild('pChart', { static: false })
  pChart!: ElementRef;
  @Input() jsonArray: any[] = [];
  @Input() chartLabels: any = [
    // "a","b","c"
  ];
  @Input() cutOut: number = 75;
  @Input() backgroundColors: any = [
    // "#55B4B0",  "#E15D44"

  ];
  /******************Variable Declarations End*******************/
  ngAfterViewInit() {


    let cvs: any;
    cvs = this.pChart.nativeElement;


    //  const combinedData = this.chartLabels.map((label: string, index: number) => {
    //   return {
    //     label: label,
    //     value: this.jsonArray[index]
    //   };

    // });


    this.backgroundColors = this.generateRandomColors(this.jsonArray.length);
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
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const index = element.index;

            // Call a function to display the popup
            this.displayNextChart(datasetIndex, index);
          }
        },



        plugins: {
          datalabels: {
            // formatter: function (value, context) {
            //   if (value == 0) {
            //     return ' ';
            //   } else {
            //     return Math.round(value) + '%';
            //   }
            // },
            // formatter: (value, ctx: any) => {
            //   const label = ctx.chart.data.labels[ctx.dataIndex];
            //   return `${label}: ${value}`;
            // },

            formatter: (value, ctx: any) => {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              if (label && value > 0) {
                // Add custom logic for text wrapping if the label is too long
                const maxLength = 10; // Set the maximum length for the label before wrapping
                if (label.length > maxLength) {
                  const wrappedLabel = label.match(new RegExp('.{1,' + maxLength + '}', 'g')).join('\n');
                  return `${wrappedLabel}: ${value}`;
                } else {

                  // this.zeroCourses.emit({ label, value });
                  return `${label}: ${value}`;
                }
              } else {
                this.zeroCourses.emit({ label, value });
                return '';


              }

            },



            color: 'white',
            font: {
              size: 11,
              weight: 'bold',
            },
          },
          legend: {
            display: false,
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

    // this.chart.data.datasets[0].data = this.chartLabels.map((label: string, index: number) => {
    //   const chartLabel = label;
    //   const jsonValue = this.jsonArray[index];
    //   return { chartLabel, jsonValue };
    // }).map((data: any) => data.chartLabel + ': ' + data.jsonValue);


  }
  // ngAfterViewInit() {
  //   let cvs: any;
  //   cvs = this.pChart.nativeElement;


  //   const combinedData = this.chartLabels.map((label: string, index: number) => {
  //     return {
  //       label: label,
  //       value: this.jsonArray[index]
  //     };
  //   });

  //   this.backgroundColors = this.generateRandomColors(this.jsonArray.length);

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
  //       onClick: (event, elements) => {
  //         // ...
  //       },
  //       plugins: {
  //         // ...
  //       },
  //     },
  //   });

  //   this.chart.data.datasets[0].data = combinedData.map((data:any) => (data.label + ': ' + data.value));
  //   this.chart.data.labels = combinedData.map((data: { label: any; }) => data.label);

  //   this.chart.update();
  // }



  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate a random hexadecimal color
      colors.push(color);
    }
    return colors;
  }

  //function to display popup on click of bar
  displayNextChart(datasetIndex: number, index: number) {
    // Get the data or other information associated with the clicked bar
    // const value = this.chart.data.datasets[datasetIndex].data[index];
    const value = this.chart.data;
    const label = this.chart.data.labels[index];

    // Use the retrieved data to display a popup or perform any desired action

    // Show your popup or perform other actions here
    this.click.emit();
    this.clickData.emit({ value, label });
  }






}