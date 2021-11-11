import "../styles/globals.css";
import { Provider } from "react-redux";
import { initializeStore } from "../config/store";
import withRedux from "next-redux-wrapper";

import Head from "next/head";

// export const WrappedApp = ({ Component, ...props }) => {
//   return (
//     <div>
//       <Head>
//         <meta
//           name='viewport'
//           content='width=device-width, initial-scale=1.0, maximum-scale=1.0,
//      user-scalable=0'
//         />

//         {/* <script type='text/javascript' src='/rollbarscript.js'></script> */}
//       </Head>

//       {props.router.asPath.includes("/about") ? (
//         <Component {...props} />
//       ) : (
//         <Component {...props} />
//       )}
//     </div>
//   );
// };

function MyApp({ Component, pageProps, store, ...otherProps }) {
  return (
    <Provider store={store}>
      <Component {...otherProps} {...pageProps}></Component>
    </Provider>
  );
}

export default withRedux(initializeStore)(MyApp);
