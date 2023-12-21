import moment from "moment";

export default (second: number) => moment.utc(second * 1000).format("mm:ss");
