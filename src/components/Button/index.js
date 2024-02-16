import { api } from "../../api/api";
import toast from "react-hot-toast";
import axios from "axios";

export function Button({ situation, naf, sheetData, setSheetData }) {
  let values = [];

  async function handleSubmit(situation, naf) {
    for (let i = 0; i < situation.length; i++) {
      values[i] = [situation[i], naf[i]];
    }
    // console.log(values);
    try {
      const response = await api.post("/updateValues", {
        values: values,
      });
      // console.log("response", response);
      getUpdatedSheetData();
      toast.success("Planilha atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro!");
    }
  }

  async function getUpdatedSheetData() {
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

  return (
    <>
      <button
        className="focus:outline-none text-white bg-midnight hover:bg-metal focus:ring-4 focus:ring-purple font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        onClick={() => {
          handleSubmit(situation, naf);
        }}
      >
        Atualizar Planilha
      </button>
    </>
  );
}
