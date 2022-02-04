import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {

  constructor() { }
  pieData!: { labels: string[], datasets: { label: string; data: unknown, backgroundColor: string[] }[] };
  pieOptions = {
    title: {
      display: true,
      text: 'My Pie Chart',
      fontSize: 16,
    },
    legend: {
      position: 'bottom',
    },
  };

  lineData!: { labels: string[], datasets: { label: string; data: unknown, backgroundColor?: string[] }[] };
  lineOptions = {
    title: {
      display: true,
      text: 'My Line Chart',
      fontSize: 16,
    },
    legend: {
      position: 'bottom',
    },
  };


  ngOnInit(): void {
    this.updateData();
  }

  updateData () {
    const randomData: number[] = [];

    for (let i = 0; i<5; i++) {
      randomData.push(Math.round(Math.random() * 100));
    }

    this.pieData = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data: randomData,
          backgroundColor: ['#f00', '#0f0', '#00f', '#ff0', '#f0f'],
        }
      ]
    };

    this.lineData = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data: randomData,
        }
      ]
    };
  }

}
