import Aurelia from "aurelia";
import { CodigoApp } from "./codigo-app";

import "./styles.less";
import { DateToStringValueConverter } from "./value-converters/date-to-string-value-converter";

Aurelia
  .register(DateToStringValueConverter)
  .app(CodigoApp)
  .start();
