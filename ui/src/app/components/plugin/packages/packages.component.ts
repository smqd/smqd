import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Packages, PackageResult } from '../../../models/package';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  packages: Packages;
  condition = {page_size:10, curr_page: 1}

  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.getPackages(this.condition);
  }

  getPackages(condition) {
    //this.loaderService.showLoader();
    this.packageService.getPackages(condition).subscribe(
      packages => {
        if (packages['code']) {
          return;
        }
        
        this.packages = packages;
        console.log('this.packages = ', this.packages);
        //this.loaderService.hideLoader();
      }
    );
  }

  install(packageName: string) {
    this.packageService.packageInstall(packageName).subscribe(
      result => {
        if (result['code']) {
          alert(result['error']);
          return;
        }

        console.log('package install result ', result);

        const receivedPackage = new PackageResult(result);
        this.packages.result.objects.forEach((packageObj) => {
          if (packageObj.name == receivedPackage.result.name) {
            packageObj.installed = receivedPackage.result.installed;
          }
        });
      }
    );
  }

  reload(packageName: string) {
    this.packageService.packageReload(packageName).subscribe(
      result => {
        if (result['code']) {
          alert(result['error']);
          return;
        }
        console.log('package reload result ', result);

        const receivedPackage = new PackageResult(result);
        this.packages.result.objects.forEach((packageObj) => {
          if (packageObj.name == receivedPackage.result.name) {
            packageObj.installed = receivedPackage.result.installed;
          }
        });
      }
    );
  }

  pageChanged(event: any): void {
    this.condition.curr_page = event.page;
    this.getPackages(this.condition);
  }
}

