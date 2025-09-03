import { Pipe, PipeTransform } from '@angular/core';
import { Consultor } from './app.component';

@Pipe({
  name: 'areaFilter',
  standalone: true
})
export class AreaFilterPipe implements PipeTransform {
  transform(consultores: Consultor[], area: string): Consultor[] {
    if (!area) return consultores;
    return consultores.filter(c => c.area.toLowerCase().includes(area.toLowerCase()));
  }
}