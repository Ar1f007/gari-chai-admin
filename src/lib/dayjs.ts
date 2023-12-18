import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";

import extDayjs from "dayjs";

extDayjs.extend(utc);
extDayjs.extend(duration);
extDayjs.extend(timezone);

extDayjs.tz.setDefault();

export default extDayjs;
