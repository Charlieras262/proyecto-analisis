import { Component, OnInit } from '@angular/core';
import { AssignService } from 'src/app/services/assign/assign.service';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from 'src/app/services/students/student.service';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';

declare var $: any;

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  socket: any;
  assignSelected = {_id: '', account_code: '' , value: ''}
  _id: string;
  value: string;

  constructor(public assignService: AssignService,
    public authService: AuthenticateService,
    public translate: TranslateService,
    public cuentasService: StudentService,
    public coursesService: CoursesService) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    this.getAssigns();
    this.getCuentas();
  }

  getCuentas() {
    this.cuentasService.getCuentas().
      subscribe(students => {
        this.cuentasService.cuentas = students;
      });
  }

  getAssigns(){
    this.assignService.getAssign().subscribe(res => {
      this.assignService.assigns = res;
    });
  }

  createAssign(form: NgForm){
    this.assignService.createAssign({account_code: $('#accountSelect').val(), value: this.value}).subscribe(res => {
      const data = JSON.parse(JSON.stringify(res));
      if(data.success){
        this.translate.get(data.msg).subscribe(str => {
          $.toaster(`${str}`, '<i class="fa fa-check-circle"></i>', 'success');
          this.socket.emit('getCourse');
          this.socket.emit('updateHome');
          this.cleanForm(form);
          this.getAssigns();
        });
      } else {
        if(data.node){
          this.translate.get('assign.'+data.node).subscribe(res => {
            this.authService.valFieldShow(data.success, this.translate.instant(data.msg), data.node, res);
          });
        } else{
          this.translate.get(data.msg).subscribe(str => {
            $.toaster(`${str}`, '<i class="fa fa-times"></i>', 'danger');
          });
        }
      }
    });
  }

  rmActiveClass(idInput) {
    const node = document.getElementById(idInput);
    node.classList.remove('valid');
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.rmActiveClass('value');
      this.flushSelectedAssign();
      $('#accountSelect option:first').prop('selected',true);
    }
  }

  selectAssign(assign, flags) {
    if (flags === 'D') {
      this.assignSelected = assign;
    } else {
      this.value = assign.value;
      $('#accountSelect').val(assign.account_code)
    }
  }

  deleteAssign() {
    this.assignService.deleteAssign(this.assignSelected._id)
      .subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        this.translate.get(data.msg).subscribe(str => {
          $.toaster(str, '<i class="fa fa-check-circle"></i>', 'success');
          this.socket.emit('getCourse');
          this.getAssigns();
          this.flushSelectedAssign();
        });
      });
  }

  flushSelectedAssign() {
    this.assignSelected = {_id: '', account_code: '' , value: ''};
  }
}