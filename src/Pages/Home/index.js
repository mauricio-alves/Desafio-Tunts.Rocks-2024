import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Toaster } from "react-hot-toast";

export function Home() {
  const [sheetData, setSheetData] = useState({});
  const [search, setSearch] = useState("");

  let totalClasses = 60;
  let average = [];
  let situation = [];
  let naf = [];

  useEffect(() => {
    async function getSheetData() {
      const spreadsheetId = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
      const range = "engenharia_de_software!B4:H27";
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

  useEffect(() => {
    handleAverage(sheetData);
    handleSituation(average, sheetData);
    handleNaf(average, situation);
  }, [naf]);

  function handleAverage(sheetData) {
    for (let i = 0; i < sheetData.values?.length; i++) {
      situation.push("A definir");
      average.push(
        (
          (Number(sheetData.values[i][2]) +
            Number(sheetData.values[i][3]) +
            Number(sheetData.values[i][4])) /
          30
        ).toFixed(1)
      );
    }
    // console.log(average, situation)
    return average;
  }

  function handleSituation(average, sheetData) {
    for (let i = 0; i < sheetData.values?.length; i++) {
      if (Number(sheetData.values[i][1]) > totalClasses / 4) {
        situation[i] = "Reprovado por Falta";
      } else if (average[i] >= 7) {
        situation[i] = "Aprovado";
      } else if (average[i] >= 5 && average[i] < 7) {
        situation[i] = "Exame Final";
      } else {
        situation[i] = "Reprovado por Nota";
      }
    }
    // console.log("situation", situation);
    return situation;
  }

  function handleNaf(average, situation) {
    for (let i = 0; i < average.length; i++) {
      if (situation[i] === "Aprovado") {
        naf.push(0);
      } else if (situation[i] === "Exame Final") {
        naf.push(1);
      } else {
        naf.push(0);
      }
    }
    // console.log("initial naf", naf);

    for (let i = 0; i < average.length; i++) {
      let nota = 0;
      if (naf[i] !== 0) {
        while (!(5 <= (Number(average[i]) + nota) / 2)) {
          nota += 0.1;
        }
        // console.log('nota', nota.toFixed(1));
        naf[i] = Number(nota.toFixed(1));
      }
    }
    // console.log("updated naf", naf);
    return naf;
  }

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center p-4">
          <h2 className="text-2xl font-mono">
            Resultado das notas da turma 2024/1 em Engenharia de Software
          </h2>
        </div>
        <div>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className="flex justify-center">
          <Button
            situation={situation}
            naf={naf}
            sheetData={sheetData}
            setSheetData={setSheetData}
          />
        </div>
        <Card
          sheetData={sheetData}
          setSheetData={setSheetData}
          search={search}
          average={average}
        />
      </div>
      <Footer />
    </div>
  );
}
