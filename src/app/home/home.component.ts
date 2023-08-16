import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  allData: any[]  ;

  ngOnInit(): void {
    this.allData = this.getAllData()
  }

  getAllData(): Array<{ key: string, value: any }> {
    const allData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = JSON.parse(localStorage.key(i));
      const value = JSON.parse(localStorage.getItem(key));
      allData.push([ key, value ]);
    }
    console.log(this.allData)
    return allData;
  }
}
