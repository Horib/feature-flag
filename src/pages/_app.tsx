import { type AppType } from "next/app";
import { AppPropsType } from "next/dist/shared/lib/utils";
import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith, { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { IState } from "flagsmith/types";

import { api } from "~/utils/api";
import "~/styles/globals.css";

type MyAppProps = AppPropsType & {
  flagsmithState?: IState<string, string>;
};

const MyApp = ({ Component, pageProps, flagsmithState }: MyAppProps) => {

  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState} options={{
      environmentID: 'b7eQEfGPnUcLQRuanVsKRJ',
      api: "https://flagsmith.lostworlds.xyz/api/v1/"
    }}>
      <Component {...pageProps} />
    </FlagsmithProvider>
  );
};

MyApp.getInitialProps = async () => {
  await flagsmith.init({
    environmentID: 'b7eQEfGPnUcLQRuanVsKRJ',
    api: "https://flagsmith.lostworlds.xyz/api/v1/"
  });

  const state = flagsmith.getState();
  return { flagsmithState: state };
};

export default api.withTRPC(MyApp);
