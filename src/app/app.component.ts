import { Component, OnDestroy } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'AnalysisChart';

  ngOnDestroy(): void {
    localStorage.removeItem('selectedCountry');
    localStorage.removeItem('selectedCamp');
    localStorage.removeItem('selectedSchool');
    localStorage.removeItem('chartList');
  }
}
