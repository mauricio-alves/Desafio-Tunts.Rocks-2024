import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [sheetData, setSheetData] = useState({});

  useEffect(() => {
    async function getSheetData() {
      const spreadsheetId = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
      const range = "A1:Z1000";
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
        );
        setSheetData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSheetData();
  }, []);

  console.log(sheetData);

  return (
    <div className="">
      <h1>Desafio Tunts.Rocks - 2024</h1>
    </div>
  );
}
