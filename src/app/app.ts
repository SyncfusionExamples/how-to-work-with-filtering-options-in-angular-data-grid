import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { GridModule, FilterService, FilterSettingsModel, IFilterUI, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DropDownList, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataUtil } from '@syncfusion/ej2-data';
import { data } from './datasource'
@Component({
  selector: 'app-root',
  imports: [GridModule, DropDownListAllModule],
  providers: [FilterService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  @ViewChild('grid')
  public grid?: GridComponent;
  protected readonly title = signal('my-angular-app');
  public data?: object[];
  public filterOptions?: FilterSettingsModel;
  public templateShipCountryDropDown?: IFilterUI;
  public shipCountryDistinctData?: object[];
  public shipCountryElement?: HTMLElement;
  public dropDown?: HTMLElement;
  public dropDownFunction(args: any) {
    const field = "ShipCountry";
    if (args.value !== "All") {
      this.grid!.filterByColumn(field, "equal", args.value);
    } else {
      this.grid!.removeFilteredColsByField(field);
    }
  }
  ngOnInit(): void {
    this.data = data;
    this.shipCountryDistinctData = DataUtil.distinct(data, 'ShipCountry', true);
    this.filterOptions = {
      type: 'FilterBar',
      ignoreAccent: true,
    };
    this.templateShipCountryDropDown = {
      create: () => {
        this.dropDown = document.createElement('select');
        this.dropDown.id = 'ShipCountry';
        const allOption = document.createElement('option');
        allOption.value = 'All';
        allOption.innerText = 'All';
        this.dropDown.appendChild(allOption);
        (this.shipCountryDistinctData as any[]).forEach((item) => {
          const option = document.createElement('option');
          option.value = item.ShipCountry;
          option.innerText = item.ShipCountry;
          this.dropDown?.appendChild(option);
        });
        return this.dropDown;
      },
      write: () => {
        const ddl = new DropDownList({
          change: this.dropDownFunction.bind(this),
        });
        ddl.appendTo(this.dropDown);
      },
    };
  }
}
interface ItemType {
  ShipCountry: string
}
