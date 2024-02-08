import { useState } from "react";
import { SearchBar } from "../SearchBar";

export function Card({ sheetData, setSheetData }) {
  const [search, setSearch] = useState("");

  let average = 0;
  let totalClasses = 60;
  let naf = 0;

  function handleAverage(num1, num2, num3) {
    average = ((Number(num1) + Number(num2) + Number(num3)) / 30).toFixed(1);
    // console.log("average", average);
    return average;
  }

  function handleSituation(average, absence) {
    if (Number(absence) > totalClasses / 4)
      return (
        <>
          <p className="bg-rose text-white p-2 text-center">
            Reprovado por Falta
          </p>
          <p>
            Nota para Aprovação Final:{" "}
            <span className="font-bold bg-rose text-white px-2">0</span>
          </p>
        </>
      );

    if (average >= 7) {
      return (
        <>
          <p className="bg-emerald text-white p-2 text-center">Aprovado</p>
          <p>
            Nota para Aprovação Final:{" "}
            <span className="font-bold bg-emerald text-white px-2">0</span>
          </p>
        </>
      );
    } else if (average >= 5) {
      naf = Number(10 - average).toFixed(1);
      // console.log("naf", naf);
      return (
        <div>
          <p className="bg-yellow text-white p-2 text-center">Exame Final</p>
          <p>
            Nota para Aprovação Final:{" "}
            <span className="font-bold bg-yellow text-white px-2">{naf}</span>
          </p>
        </div>
      );
    } else {
      return (
        <>
          <p className="bg-rose text-white p-2 text-center">
            Reprovado por Nota
          </p>
          <p>
            Nota para Aprovação Final:{" "}
            <span className="font-bold bg-rose text-white px-2">0</span>
          </p>
        </>
      );
    }
  }

  return (
    <div>
      <div>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-4 font-sans lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {sheetData.values
          ?.slice(3)
          .filter((currentStudent) => {
            // console.log("currentStudent", currentStudent);
            return currentStudent[1]
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((currentStudent, index) => {
            return (
              <div key={index} className="m-6">
                <p>
                  Nome do Aluno:{" "}
                  <span className="font-bold">{currentStudent[1]}</span>
                </p>
                <p>
                  Número de Faltas:{" "}
                  <span className="font-bold">{currentStudent[2]}</span>
                </p>
                <p>
                  Média do Aluno:
                  <span className="font-bold">
                    {` ${handleAverage(
                      currentStudent[3],
                      currentStudent[4],
                      currentStudent[5]
                    )}`}
                  </span>
                </p>
                <div>
                  <h3>Situação do Aluno:</h3>
                  {handleSituation(average, currentStudent[2])}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
