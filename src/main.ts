import Aurelia from "aurelia";
import { CodigoApp } from "./codigo-app";

import "./styles.less";
import { DateToStringValueConverter } from "./value-converters/date-to-string-value-converter";

import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

Aurelia
  .register(DateToStringValueConverter)
  .app(CodigoApp)
  .start();
