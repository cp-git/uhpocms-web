
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart ,ChartOptions,registerables} from 'chart.js';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
 
 
  
    constructor(private courProgServ : CourseProgressService){
  
    }
  
   
  
    chart: any;
    labels:String[]=[];
    @ViewChild('dChart', { static: false })
    dChart!: ElementRef;
    @Input() jsonArray: any = [15,20];
    @Input() chartLabels: any = [
      '0-25','26-50','51-75','76-100'
      
    ];
    @Input() cutOut: number = 75;
    @Input() backgroundColors: any = [
      "#eeff6a","#f0b8b8", "#57d286","#6f7dee"
   
    ];
    // @Input() backgroundColors: any = [
    //   "#E15D44", "#55B4B0","#a020f0","#0000FF"
   
    // ];
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
    // -------------------------------------------------------------------------------------------
    ngAfterViewInit() {
      
      // const dataset:[label:string,data:any[], backgroundColor:any, borderWidth:any]=[];
      let cvs: any;
      cvs = this.dChart.nativeElement;

      // const labels = this.chartLabels.map((label: string) => ({
      //   label: label,
      
      // }));
      // const labels = this.chartLabels.map((label: string, index: number) => ({
      //   label: label[index],
        
      // }));
      // console.log(labels)

      //  const labels= this.chartLabels.map((label: string, index: number) => ({
        
      //     label: (index == 0 || index == 1 || index == 2 || index == 4) ? label : ''
      //   }));

      this.labels = this.chartLabels.map((label: string, index: number) => {
        if (index === 0) {
          return { label: label.toString() };
        } else if (index === 1) {
          return { label: label.toString()  };
        } else if (index === 2) {
          return { label: label.toString()  };
        } else if (index === 4) {
          return { label: label.toString()  };
        } else {
          return { label: '' };
        }
      });
      

      
    const datasets =   
    this.chartLabels.map((label: string, index: number) => {
    


      if (index == 0) {
        return {  label: label,
                  data: [this.jsonArray[index]],
                  backgroundColor: this.backgroundColors[index],
                  borderWidth: 0,
         };
      } else if (index == 1) {
        return {
          label: label,
          data: [this.jsonArray[index]],
          backgroundColor: this.backgroundColors[index],
          borderWidth: 0,
          };
      } else if (index == 2) {
        return { 
          label: label,
          data: [this.jsonArray[index]],
          backgroundColor: this.backgroundColors[index],
          borderWidth: 0,
         };
      } else if (index == 4) {
        return {  label: label,
          data: [this.jsonArray[index]],
          backgroundColor: this.backgroundColors[index],
          borderWidth: 0,  };
      } else {
        return {  label: ' ',
          data: [],
          backgroundColor: [],
          borderWidth: 0, };
      }
    });
 
    
    
                  

      this.chart = new Chart(cvs, {
        type: 'bar',
        data: {
          // labels:this.chartLabels , // Empty label to maintain consistent spacing
          // datasets: datasets,
          
          labels: this.chartLabels,
          // datasets:datasets,
          datasets : [
            {
              label:'' ,
              data: this.jsonArray,
              backgroundColor: this.backgroundColors,
              borderWidth: 0,
            },
          ],
          // datasets:[
          //   this.chartLabels.map((label: string, index: number) => ({
          //   label: label,
          //   data: [this.jsonArray[index]],
          //   backgroundColor: this.backgroundColors[index],
          //   borderWidth: 0,
          // }))],
        },
        plugins: [ChartDataLabels],
        options: {
          // responsive: false,
          // maintainAspectRatio: true,
          
                 
          plugins: {
            datalabels: {
          //    anchor: 'end', // Display the labels at the end of the bars
          // align: 'top', // Display the labels at the top of the bars
          font: {
            size: 12,
            weight: 'bold',
          },
              formatter: function(value, context) {
                return Math.round(value) + '%';
              },
              color: 'black'
            },
            legend: {
              display: true,
              position: 'top',
              align: 'start',
              labels: {
                boxWidth: 10,
              
               padding: 10,
                generateLabels: (chart) => {
                  return this.chartLabels.map((label: any,index: number) => ({
                    text: label,
                    fillStyle:this.backgroundColors[index], // Customize the legend text color
                  }));
          }
       
          }
        } 
      }
      
    
    }  
    // options: {
    //   plugins: {
    //     datalabels: {
    //       anchor: 'end', // Display the labels at the end of the bars
    //       align: 'top', // Display the labels at the top of the bars
    //       font: {
    //         size: 14,
    //         weight: 'bold',
    //       },
    //       formatter: (value: any) => {
    //         return value + '%'; // Customize the label text format
    //       },
    //     },
    //   },
    
    // },


  });
    // ----------------------------------------------------------------------------------------------



    // ngAfterViewInit() {
    //   let cvs: any;
    //   cvs = this.dChart.nativeElement;
    

    //   const datasets = this.chartLabels.map((label: string, index: number) => ({
    //     label: label,
    //     data: [this.jsonArray[index]],
    //     backgroundColor: this.backgroundColors[index],
    //     borderWidth: 0,
    //   }));
    
    //   this.chart = new Chart(cvs, {
    //     type: 'bar',
    //     data: {
    //       labels: this.chartLabels,
    //       datasets: datasets,
    //     },
    //     plugins: [ChartDataLabels],
    //     options: {
    //       scales: {
    //         r: {
    //           ticks: {
              
    //             callback: function(value, index, values) {
    //               return value + '%';
    //             },
    //           },
    //         },
    //       },
    //     },
        
    //   });
    // }


    }
    }
