import "./DateTableHeader.scss";

interface DateTableHeader {
  date: string;
}

export default function DateTableHeader({ date }: DateTableHeader) {
  return <div className="dateheader">{date}</div>;
}
