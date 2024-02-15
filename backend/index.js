const express = require("express");
const cors = require("cors");
const req = require("express/lib/request");
const { google } = require("googleapis");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
const spreadsheetId = "1OWSkRtM74ZnbbzRvXHdJhRuipbCkIS37wTRQ_IdGbIE";

async function getAuthSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
}

// Criado para testes via Insomnia
app.get("/metadata", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  res.send(metadata.data);
});

// Criado para testes via Insomnia
app.get("/getRows", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "engenharia_de_software",
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  res.send(getRows.data);
});

// Rota pra atualizar a planilha
app.post("/updateValues", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const { values } = req.body;

  const updateValue = await googleSheets.spreadsheets.values.update({
    spreadsheetId,
    range: "engenharia_de_software!G4:H27",
    valueInputOption: "RAW",
    resource: {
      values: values,
    },
  });

  res.send(updateValue.data);
});

app.listen(3001, () => console.log("Rodando na porta 3001"));
