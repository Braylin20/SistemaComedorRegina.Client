import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {Gastos} from '../../interfaces/gastos.interface';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {GastosService} from '../../service/gastos.service';
import {DateUtils} from '../../../utils/date-utils';
import {HttpServices} from '../../../Services/Http.Services';

@Component({
  selector: 'index-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
})
export class FilterComponent {

  @ViewChild('txtFilterSelect') readonly txtFilterSelect?: ElementRef<HTMLSelectElement>;
  @ViewChild('FromDateValue') readonly fromDateInputValue?: ElementRef<HTMLInputElement>;
  @ViewChild('ToDateValue') readonly toDateInputValue?: ElementRef<HTMLInputElement>;

  readonly list = input.required<any>();
  readonly onListChange = output<any>()
  readonly endpoint = input.required<string>();
  private readonly httpService: HttpServices = inject(HttpServices);
  protected descriptionInputValue = signal('');
  protected isCustom = signal(false);

  protected readonly dateUtils = DateUtils;

  debounceEffect = effect((onCleanup) => {
    const description = this.descriptionInputValue();
    const timeout = setTimeout(() => {
      this.getByFilter(this.txtFilterSelect?.nativeElement.value ?? '', description);
    }, 500)

    onCleanup(() => {
      clearTimeout(timeout)
    })
  })

  private getByFilter(filterSelectedValue: string, descriptionValue: string, from?: string, to?: string) {
    this.dateUtils.getByDate(
      this.httpService,
      this.endpoint(),
      filterSelectedValue,
      descriptionValue,
      from,
      to
    ).subscribe({
      next: (gastos) => {
        if (gastos) {
          this.onListChange.emit(gastos)
        }
      }
    })
  }

  public onInputSelectChange() {
    const descriptionValue = this.descriptionInputValue()
    if (this.txtFilterSelect?.nativeElement.value == 'custom') {
      this.isCustom.set(true);
      return;
    }
    this.isCustom.set(false);
    this.getByFilter(
      this.txtFilterSelect?.nativeElement.value ?? '',
      descriptionValue
    );
  }

  public onDateCustomValueChange(value: string) {
    this.getByFilter(
      this.txtFilterSelect?.nativeElement.value ?? '',
      this.descriptionInputValue() ?? '',
      this.fromDateInputValue?.nativeElement.value,
      this.toDateInputValue?.nativeElement.value
    );
  }

}
