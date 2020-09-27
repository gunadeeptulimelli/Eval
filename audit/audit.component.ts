import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';
import {MatTableDataSource} from '@angular/material/table';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    public isSearch: boolean = true;
    public Timezone = ['12 Hrs','24 Hrs'];
    public timerbol:boolean = false;
    audits = [];
    displayedColumns: string[] = ["id" ,"user","loginTime","logoutTime","ip"];
    dataSource:MatTableDataSource<any>;
    @ViewChild(MatSort,{static:false}) sort: MatSort;
    @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => 
                {
                    this.audits = audits
                    console.log(this.audits);
                    this.dataSource= new MatTableDataSource(this.audits);
                    this.dataSource.paginator=this.paginator;
                    this.dataSource.sort=this.sort;                   
                   
                });
            

    }

    applyFilter(filterValue: string) {
    
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue =   filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
      applyFilter3(filterValue: string){
          
          if(filterValue == "12 Hrs")
          {
                this.timerbol = true;
                console.log(this.timerbol);
          }else if(filterValue == "24 Hrs")
          {
                this.timerbol = false;
                console.log(this.timerbol);
          }
      }
}