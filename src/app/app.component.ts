import { Component, OnDestroy } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'AnalysisChart';
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) { }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedCountry');
    localStorage.removeItem('selectedCamp');
    localStorage.removeItem('selectedSchool');
    localStorage.removeItem('chartList');
  }

  toggleTheme() {
    this.darkModeService.toggle();
  }
}
