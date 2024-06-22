import extDayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
// import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

extDayjs.extend(utc);
extDayjs.extend(duration);
// extDayjs.extend(timezone);
extDayjs.extend(relativeTime);

export default extDayjs;
