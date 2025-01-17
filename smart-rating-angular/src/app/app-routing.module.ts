import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PresentationsPageComponent } from './presentations-page/presentations-page.component';
import { EvaluationsPageComponent } from './evaluations-page/evaluations-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [

  { path: '', component: HomeComponent  },
  {path: 'home', component: HomeComponent},
  {path: 'presentations', component: PresentationsPageComponent,
      canActivate: [authGuard],
    data: { permission: 'TELA_APRESENTACAO' },
  },
  {path: 'evaluations', component: EvaluationsPageComponent, canActivate: [authGuard],
    data: { permission: 'TELA_AVALIACAO' }  },
  {path: 'results', component: ResultsPageComponent},
  {path: 'about', component: AboutPageComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
