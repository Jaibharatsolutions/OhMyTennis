import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
/* [ Custom Pipe ] */
import {
  TruncatePipe,
  PhonePrefixPlusPipe,
  SecureImagesPipe
} from "./app.pipe";
/* [ Shared Plugins ] */
import { SlickCarouselModule } from "ngx-slick-carousel";
import { SlideshowModule } from "ng-simple-slideshow";
/* [ shared Module ] */
import {
  DecimalNumberOnlyDirective,
  NumberOnlyDirective,
  CompareValidatorDirective,
  NoWhitespaceDirective,
  IBMPhoneDirective,
  NumberZeroGreaterDirective
} from "./app.directive";
@NgModule({
  imports: [SlickCarouselModule, SlideshowModule],
  declarations: [
    DecimalNumberOnlyDirective,
    NumberOnlyDirective,
    CompareValidatorDirective,
    NoWhitespaceDirective,
    TruncatePipe,
    PhonePrefixPlusPipe,
    SecureImagesPipe,
    IBMPhoneDirective,
    NumberZeroGreaterDirective
  ],
  providers: [],
  bootstrap: [],
  exports: [
    DecimalNumberOnlyDirective,
    NumberOnlyDirective,
    CompareValidatorDirective,
    NoWhitespaceDirective,
    TruncatePipe,
    PhonePrefixPlusPipe,
    SecureImagesPipe,
    IBMPhoneDirective,
    NumberZeroGreaterDirective,
    SlickCarouselModule,
    SlideshowModule
  ]
  // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule {}
