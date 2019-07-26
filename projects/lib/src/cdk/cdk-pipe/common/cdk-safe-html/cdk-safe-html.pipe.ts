import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cdkSafeHtml' })
export class CdkSafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  public transform(value: string): SafeUrl {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
