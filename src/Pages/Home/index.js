import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function Home() {
  const [sheetData, setSheetData] = useState({});

  useEffect(() => {
    async function getSheetData() {
      const spreadsheetId = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
      const range = "engenharia_de_software!B4:F27";
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
        );
        // console.log("response", response);
        setSheetData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSheetData();
  }, []);

  // console.log("sheetData", sheetData);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center p-4">
          <h2 className="text-2xl font-mono">
            Resultado das notas da turma 2024/1 em Engenharia de Software
          </h2>
        </div>
        <Card sheetData={sheetData} setSheetData={setSheetData} />
      </div>
      <Footer />
    </div>
  );
}
