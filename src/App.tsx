import React, { useEffect, useState } from "react";
import "./App.css";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { getSheet, listSheets } from "./drive/api";
import {
  CardSetOptions as CardSetOptionsType,
  CardSheet,
  Ordering,
  Sheet,
} from "./utils/types";
import SheetSelector from "./components/SheetSelector";
import CardSetOptions from "./components/CardSetOptions";
import { getCardsToDisplay } from "./utils/cards";
import Cards from "./components/Cards";

const scope = "https://www.googleapis.com/auth/drive.readonly";
type GoogleRsp = GoogleLoginResponse | GoogleLoginResponseOffline;

function App() {
  const [showButton, toggleShow] = useState(true);
  const [token, setToken] = useState("");
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [activeSheetId, setActiveSheetId] = useState<string | null>();
  const [cardSheet, setCardSheet] = useState<CardSheet>();
  const [cardSetOptions, setCardSetOptions] = useState<CardSetOptionsType>({
    ordering: Ordering.Random,
    selectedSets: {},
    randomSeed: Math.random(),
  });

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      const data = await listSheets(token);
      setSheets(data);
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (!activeSheetId) {
      setCardSheet(undefined);
      return;
    }

    const fetchData = async () => {
      const data = await getSheet(activeSheetId, token);

      setCardSheet(data);

      setCardSetOptions({
        ...cardSetOptions,
        selectedSets: Object.keys(data.sets).reduce<Record<string, boolean>>(
          (acc, curr, i) => {
            acc[curr] = i === 0;
            return acc;
          },
          {}
        ),
      });
    };

    fetchData();
  }, [activeSheetId]);

  return (
    <div className="App">
      {showButton && (
        <GoogleLogin
          clientId={
            "142991266792-cncfqbdl9kih5n5tim08telk7p9958v2.apps.googleusercontent.com"
          }
          scope={scope}
          buttonText="Connect to Google"
          onSuccess={(rsp: GoogleRsp) => {
            toggleShow(false);
            setToken("accessToken" in rsp ? rsp.accessToken : "");
          }}
          onFailure={(err: any) => {
            console.log(err);
          }}
          cookiePolicy={"single_host_origin"}
        />
      )}

      {token && sheets && (
        <SheetSelector
          sheets={sheets}
          onSheetSelect={(sheetId) => {
            setActiveSheetId(sheetId);
          }}
        />
      )}

      {cardSheet && (
        <>
          <CardSetOptions
            cardSets={cardSheet.sets}
            options={cardSetOptions}
            onOptionsChange={(options) => setCardSetOptions(options)}
          />

          <Cards cards={getCardsToDisplay(cardSheet.sets, cardSetOptions)} />
        </>
      )}
    </div>
  );
}

export default App;
