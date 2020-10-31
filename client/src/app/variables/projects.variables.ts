import { OnInit } from '@angular/core';
import * as io from 'socket.io-client';

export class ProjectVariable implements OnInit {
  /*http://localhost:8080/, https://brainsco-app.herokuapp.com*/
  static serverLocation = "http://localhost:8080/";
  static socket = io(ProjectVariable.serverLocation);
  static secret = 'mgmY14dYnV4c!'
  constructor() {
  }

  ngOnInit() {

  }
}