import DateInput from "./shared/components/calendar/DateInput";

function App() {
  return (
    <div>
      <DateInput placeholder="YYYY.MM.DD" onClick={console.log} />
    </div>
  );
}

export default App;
