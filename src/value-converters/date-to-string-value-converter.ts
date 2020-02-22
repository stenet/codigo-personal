import { inject } from "aurelia";

@inject()
export class DateToStringValueConverter {
  private DAY_MONTH_LENGHT = 2;

  toView(value: Date) {
    if (!value) {
      return null;
    }

    if (typeof value == "string") {
      value = new Date(value);
    }

    const day = (value.getDate())
      .toString()
      .padStart(this.DAY_MONTH_LENGHT, "0");
    
    const month = (value.getMonth() + 1)
      .toString()
      .padStart(this.DAY_MONTH_LENGHT, "0");

    const year = value
      .getFullYear()
      .toString();
    
    return `${day}.${month}.${year}`;
  }
}