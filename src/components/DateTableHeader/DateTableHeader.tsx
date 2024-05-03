import dayjs from "dayjs";
import "./DateTableHeader.scss";

interface DateTableHeader {
  date: string;
}

export default function DateTableHeader({ date }: DateTableHeader) {
  return (
    <div className="dateheader">
      {dayjs(date, "YYYY-MM-DD").format("dddd DD/MM/YY")}
    </div>
  );
}
