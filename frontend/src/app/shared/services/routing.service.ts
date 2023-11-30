import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Features} from "../models/features";
import {FeatureStep} from "../models/feature-step";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) {
  }

  navigateToStep(feature: Features, step: FeatureStep) {
    this.router.navigate([feature, step], {skipLocationChange: true, queryParamsHandling: 'preserve'})
  }

  navigateToErrorPage() {
    this.router.navigate(['/error'], {queryParamsHandling: null})
  }
}
