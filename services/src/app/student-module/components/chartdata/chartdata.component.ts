import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart ,registerables} from 'chart.js';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
Chart.register(...registerables);
@Component({
  selector: 'app-chartdata',
  templateUrl: './chartdata.component.html',
  // template: '<canvas id="myChart"></canvas>',
  styleUrls: ['./chartdata.component.css']
})
export class ChartdataComponent {

  constructor(private courProgServ : CourseProgressService){

  }

  // ngOnInit() {

    // this.courProgServ.getAllCourseProgress().subscribe(data => {
    //   const formattedData = data.map(item => {
    //     return {
    //       label: item.courseId,
    //       value: item.progress
    //     };
    //   });

      
    //   const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    //   if (ctx) {
    //   const pieChart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //       datasets: [{
    //         data: formattedData.map(item => item.value),
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.5)',
    //           'rgba(54, 162, 235, 0.5)'
              
    //         ]
    //       }],
    //       labels: formattedData.map(item => item.label)
    //     },
    //     options: {
    //       responsive: true,
          
    //     }
    //   });
    // }
    
  //   const data = {
  //     labels: [
  //       'Red',
  //       'Blue',
  //       'Yellow'
  //     ],
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [300, 50, 100],
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)'
  //       ],
  //       hoverOffset: 4
  //     }]
  //   };
  //   // });
  //   const config = {
  //     type: 'doughnut',
  //     data: data,
  //   };
  // const ctx = document.getElementById('myChart')  as HTMLCanvasElement;

  // new Chart(ctx, {
  //   type: 'doughnut',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  
  // });

  chart: any;

  @ViewChild('dChart', { static: false })
  dChart!: ElementRef;
  @Input() jsonArray: any = [25, 15, 20, 15, 30];
  @Input() chartLabels: any = [
    'label 1',
    'label 2',
    'label 3',
    'label 4',
    'label 5',
  ];
  @Input() cutOut: number = 75;
  @Input() backgroundColors: any = [
    '#E15D44',
    '#55B4B0',
    '#DFCFBE',
    '#9B2335',
    '#5B5EA6',
  ];

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
      }
      // ,
      // options: {
      //   responsive: false,
      //   legend: {
      //     display: false,
      //   },
      //   cutoutPercentage: this.cutOut,
      //   tooltips: {
      //     enabled: true,
      //   },
      //   layout: {
      //     padding: {
      //       left: 0,
      //       right: 0,
      //       top: 0,
      //       bottom: 0,
      //     },
      //   },
      // },
    });
  }
  


  // }

}


  