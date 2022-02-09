import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {

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

  constructor(
    public salesService: StatsService,
  ) {
    this.salesService.year = 2022;
  }

  ngOnInit(): void {
    this.updateData();
  }

  updateData () {
    const randomData: number[] = [];

    for (let i = 0; i<5; i++) {
      randomData.push(Math.round(Math.random() * 100));
    }

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
