import { useState } from "react";
import { SearchBar } from "../SearchBar";

export function Card({ sheetData, setSheetData }) {
  const [search, setSearch] = useState("");

  let average = [];
  let totalClasses = 60;
  let situation = [];
  let naf = [];

  function handleAverage(num1, num2, num3, index) {
    situation.push("A definir");
    average.push(
      ((Number(num1) + Number(num2) + Number(num3)) / 30).toFixed(1)
    );
    return average[index];
  }

  // console.log("average", average);

  function handleSituation(average, absence, index) {
    // console.log("absence", absence);

    if (Number(absence) > totalClasses / 4) {
      situation[index] = "Reprovado por Falta";
      return (
        <p className="bg-rose text-white p-2 text-center">{situation[index]}</p>
      );
    } else if (average[index] >= 7) {
      situation[index] = "Aprovado";
      return (
        <p className="bg-emerald text-white p-2 text-center">
          {situation[index]}
        </p>
      );
    } else if (average[index] >= 5 && average[index] < 7) {
      situation[index] = "Exame Final";
      return (
        <p className="bg-yellow text-white p-2 text-center">
          {situation[index]}
        </p>
      );
    } else {
      situation[index] = "Reprovado por Nota";
      return (
        <p className="bg-rose text-white p-2 text-center">{situation[index]}</p>
      );
    }
  }

  // console.log("situation", situation);

  function handleNaf(average, situation, index) {
    // console.log("situation", situation);

    if (situation[index] === "Aprovado") {
      // console.log("naf", naf);
      naf.push(0);
      return (
        <span className="font-bold bg-emerald text-white px-2">
          {naf[index]}
        </span>
      );
    } else if (situation[index] === "Exame Final") {
      naf.push(1);
      return (
        <span className="font-bold bg-yellow text-white px-2">
          {calculateNaf(average, naf, index)}
        </span>
      );
    } else {
      naf.push(0);
      return (
        <span className="font-bold bg-rose text-white px-2">{naf[index]}</span>
      );
    }
  }

  // console.log("naf", naf);

  function calculateNaf(average, naf, index) {
    let nota = 0;
    if (naf[index] !== 0) {
      while (!(5 <= (Number(average[index]) + nota) / 2)) {
        nota += 0.1;
      }
      // console.log('nota', nota.toFixed(1));
      return (naf[index] = nota.toFixed(1));
    }
  }

  return (
    <div>
      <div>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-4 font-sans lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {sheetData.values
          ?.filter((currentStudent) => {
            // console.log("currentStudent", currentStudent);
            return currentStudent[0]
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((currentStudent, index) => {
            return (
              <div key={index} className="m-6">
                <p>
                  Nome do Aluno:{" "}
                  <span className="font-bold">{currentStudent[0]}</span>
                </p>
                <p>
                  Número de Faltas:{" "}
                  <span className="font-bold">{currentStudent[1]}</span>
                </p>
                <p>
                  Média do Aluno:
                  <span className="font-bold">
                    {` ${handleAverage(
                      currentStudent[2],
                      currentStudent[3],
                      currentStudent[4],
                      index
                    )}`}
                  </span>
                </p>
                <div>
                  <h3>Situação do Aluno:</h3>
                  {handleSituation(average, currentStudent[1], index)}
                  <p>
                    Nota para Aprovação Final:{" "}
                    {handleNaf(average, situation, index)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
