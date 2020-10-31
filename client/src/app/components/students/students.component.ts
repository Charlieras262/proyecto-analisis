import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from 'src/app/services/students/student.service';
import { NgForm } from '@angular/forms';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';

declare var $: any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  socket: any;
  code: string
  name: string;
  accountSelected = { _id: '', name: '', nature: '', type: '' };

  constructor(public translate: TranslateService,
    public cuentaService: StudentService,
    public instService: InstitutionsService) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    this.getCuentas();
  }

  getCuentas() {
    this.cuentaService.getCuentas().
      subscribe(res => {
        this.cuentaService.cuentas = res;
      });
  }

  createCuenta(form: NgForm) {
    this.cuentaService.postCuenta({
      _id: this.code,
      name: this.name,
      naturaleza: $('#natureSelect').val(),
      tipo: $('#typeSelect').val()
    }).subscribe(res => {
      this.translate.get(res as string).subscribe(str => {
        $.toaster(`${str}`, '<i class="fa fa-check-circle"></i>', 'success');
      });
      this.getCuentas();
      this.cleanForm(form);
      this.socket.emit('updateHome');
    });
  }

  checkField(fieldData, idInput, fieldname) {
    const node = document.getElementById(idInput);
    if (fieldData === undefined || fieldData === ' ' || fieldData === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('cuenta.field1')} ${fieldname} ${this.translate.instant('cuenta.field2')}`, success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  valField(val, msg, id, fieldname) {
    if (!val) {
      $('#' + id).popover({
        title: 'Error',
        content: msg,
        html: false,
        trigger: 'focus'
      });
      $('#' + id).on('input', () => {
        $('#' + id).popover('hide');
        let data;
        switch (id) {
          case 'fnac':
            data = this.checkDateField($('#' + id).children()[0].value, id, fieldname);
            break;
          case 'tel':
            data = this.checkTelField($('#' + id).children()[0].value, id, fieldname);
            break;
          case 'cui':
            data = this.checkDpiField($('#' + id).children()[0].value, id, fieldname);
            break;
          default:
            data = this.checkField($('#' + id).children()[0].value, id, fieldname);
            break;
        }
        this.valField(data.success, data.msg, id, fieldname);
      })
    } else {
      $('#' + id).popover('dispose');
    }
  }


  checkDpiField(field, id, fieldname) {
    const node = document.getElementById(id);
    if (field === undefined || field === ' ' || field === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('cuenta.field1')} ${fieldname} ${this.translate.instant('cuenta.field2')}`, success: false };
    } else if (field.length < 13) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('cuenta.valDpiLess'), success: false };
    } else if (field.length > 13) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('cuenta.valDpiMore'), success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  checkTelField(field, id, fieldname) {
    const node = document.getElementById(id);
    if (field === undefined || field === ' ' || field === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('cuenta.field1')} ${fieldname} ${this.translate.instant('cuenta.field2')}`, success: false };
    } else if (field.length < 8) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('cuenta.valTelLess'), success: false };
    } else if (field.length > 8) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('cuenta.valTelMore'), success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  checkDateField(field, id, fieldname) {
    const node = document.getElementById(id);
    const rex = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    if (field === undefined || field === ' ' || field === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('cuenta.field1')} ${fieldname} ${this.translate.instant('cuenta.field2')}`, success: false };
    } else if (!rex.test(field)) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('cuenta.valDate'), success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.rmActiveClass('inst');
      this.rmActiveClass('name');
      this.rmActiveClass('lastname');
      this.rmActiveClass('fnac');
      this.rmActiveClass('cui');
      this.rmActiveClass('tel');
      this.rmActiveClass('address');
      $('#natureSelect option:first').prop('selected',true);
      $('#typeSelect option:first').prop('selected',true);
    }
  }

  rmActiveClass(idInput) {
    const node = document.getElementById(idInput);
    node.classList.remove('valid');
  }

  selectCuenta(cuenta, flags) {
    if (flags === 'D') {
      this.accountSelected = cuenta;
    } else {
      this.code = cuenta._id;
      this.name = cuenta.name;
      $('#natureSelect').val(cuenta.naturaleza);
      $('#typeSelect').val(cuenta.tipo);
    }
  }

  deleteCuenta() {
    this.cuentaService.deleteCuenta(this.accountSelected._id)
      .subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        this.translate.get(data.msg).subscribe(res => {
          $.toaster(res, '<i class="fa fa-check-circle"></i>', 'success');
          this.getCuentas();
          this.flushSelectedCuenta();
        });
      });
  }

  flushSelectedCuenta() {
    this.accountSelected = { _id: '', name: '', nature: '', type: '' };
  }
}
