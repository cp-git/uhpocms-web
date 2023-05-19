
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Chart ,ChartOptions,registerables,TooltipItem} from 'chart.js';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-zoom';

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
    @Output() clickData: EventEmitter<{ value: any; label: string }> = new EventEmitter();

    @Output() click: EventEmitter<any> = new EventEmitter<any>();
  
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
      

      
    
    
    
                  

      this.chart = new Chart(cvs, {
        type: 'bar',
        data: {
          // labels:this.chartLabels , // Empty label to maintain consistent spacing
          // datasets: datasets,
          
          labels: this.chartLabels,
          // datasets:datasets,
          datasets : [
            {
          
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
              formatter: function(value, context) {
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
  //   // ----------------------------------------------------------------------------------------------
 // Add event listener to handle right-click on the chart canvas
//  cvs.addEventListener('contextmenu', this.handleRightClick.bind(this));
 // Add event listener to handle right-click on bars
//  cvs.addEventListener('contextmenu', (event: { preventDefault: () => void; }) => {
//   event.preventDefault(); // Prevent the default context menu behavior

//   const activePoints = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

//   if (activePoints.length > 0) {
//     const firstPoint = activePoints[0];

//     // Call a function to handle the right-click event on the bar
//     this.handleRightClick(firstPoint);
//   }
// });



console.log(this.chart)
    }
    // handleBarRightClick(point: { datasetIndex: number; index: number; }) {
    //   // Get the data or other information associated with the clicked bar
    //   const datasetIndex = point.datasetIndex;
    //   const index = point.index;
    //   const value = this.chart.data.datasets[datasetIndex].data[index];
    //   const label = this.chart.data.labels[index];
    
    //   // Use the retrieved data to perform any desired action
    //   console.log(`Right-clicked bar: ${label} - Value: ${value}`);
    //   // Perform your custom action here
    // }
    // handleRightClick(event: MouseEvent, point: { datasetIndex: number; index: number; }) {
    //   if (event.button === 2 ) { // Check if the right mouse button was clicked
    //     const chart = this.chart; // Assuming you have already assigned the chart instance to a property called 'chart'
    //     this.rightClick.emit();
    //     // Check if the zoom plugin is available
    //     if (chart.zoom) {
    //       chart.zoom.reset(); // Reset the zoom to its initial state
    //     }
    //   }


    //    // Get the data or other information associated with the clicked bar
    //    const datasetIndex = point.datasetIndex;
    //    const index = point.index;
    //    const value = this.chart.data.datasets[datasetIndex].data[index];
    //    const label = this.chart.data.labels[index];
     
    //    // Use the retrieved data to perform any desired action
    //    console.log(`Right-clicked bar: ${label} - Value: ${value}`);
    //    this.rightClickData.emit({ value, label });
    //    // Perform your custom action here
    // }

    // handleRightClick(event: MouseEvent, point: { datasetIndex?: number; index?: number }) {
    //   if (event.button === 2) { // Check if the right mouse button was clicked
    //     const chart = this.chart; // Assuming you have already assigned the chart instance to a property called 'chart'
    //     this.rightClick.emit();
    
    //     // // Check if the zoom plugin is available
    //     // if (chart.zoom) {
    //     //   chart.zoom.reset(); // Reset the zoom to its initial state
    //     // }

    //     if (point?.datasetIndex !== undefined && point?.index !== undefined) {
    //       // Get the data or other information associated with the clicked bar
    //       const datasetIndex = point.datasetIndex;
    //       const index = point.index;
    //       const value = this.chart.data.datasets[datasetIndex].data[index];
    //       const label = this.chart.data.labels[index];
      
    //       // Use the retrieved data to perform any desired action
    //       console.log(`Right-clicked bar: ${label} - Value: ${value}`);
    //       this.rightClickData.emit({ value, label });
    //     }
    //   }
    

    // }
    
    


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
