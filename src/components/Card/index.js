import { useEffect, useState } from "react";

export function Card({ sheetData, setSheetData, search, average }) {
  const [updatedAverage, setUpdatedAverage] = useState();

  useEffect(() => {
    setUpdatedAverage(average);
  }, [average]);

  return (
    <div>
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
                  Nome do Aluno:
                  <span className="font-bold ml-1">{currentStudent[0]}</span>
                </p>
                <p>
                  Número de Faltas:
                  <span className="font-bold ml-1">{currentStudent[1]}</span>
                </p>
                <p>
                  Média do Aluno:
                  <span className="font-bold ml-1">
                    {updatedAverage[index]}
                  </span>
                </p>
                <div>
                  <h3>Situação do Aluno:</h3>
                  <p
                    className={`text-white p-2 text-center ${
                      !currentStudent[5] ? "bg-purple" : "bg-tahiti"
                    }`}
                  >
                    {!currentStudent[5] ? "Aguardando" : currentStudent[5]}
                  </p>
                  <p>
                    Nota para Aprovação Final:
                    <span
                      className={`font-bold text-white ml-1 px-2 ${
                        !currentStudent[5] ? "bg-purple" : "bg-metal"
                      }`}
                    >
                      {!currentStudent[6] ? "?" : currentStudent[6]}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
