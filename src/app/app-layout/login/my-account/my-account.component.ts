import { AuthDetail } from './../../../common/util/auth-detail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user = AuthDetail.getLoginedInfo();

  constructor() { }

  ngOnInit(): void {
  }

}
