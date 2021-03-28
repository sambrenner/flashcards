import Layout from "../components/Layout";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useEffect, useState } from "react";
import { server } from "../config";
import {
  CardSetOptions as CardSetOptionsType,
  CardSheet,
  Ordering,
  Sheet,
} from "../utils/types";
import SheetSelector from "../components/SheetSelector";
import CardSetOptions from "../components/CardSetOptions";
import Cards from "../components/Cards";
import { getCardsToDisplay } from "../utils/cards";

const scope = "https://www.googleapis.com/auth/drive.readonly";
type GoogleRsp = GoogleLoginResponse | GoogleLoginResponseOffline;

const IndexPage = () => {
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
      const res = await fetch(`${server}/api/sheets`, {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setSheets(data.sheets);
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (!activeSheetId) {
      setCardSheet(undefined);
      return;
    }

    const fetchData = async () => {
      const res = await fetch(`${server}/api/sheets/${activeSheetId}`, {
        headers: {
          Authorization: token,
        },
      });

      const data: CardSheet = await res.json();

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
    <Layout title="Flashcards">
      {showButton && (
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
          scope={scope}
          buttonText="Connect to Google"
          onSuccess={(rsp: GoogleRsp) => {
            toggleShow(false);
            setToken("tokenId" in rsp ? rsp.accessToken : "");
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
    </Layout>
  );
};

export default IndexPage;
