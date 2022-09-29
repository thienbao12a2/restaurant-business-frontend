import React from "react";

const MerchantInterfaceContext = React.createContext({});

export const MerchantInterfaceConsumer = MerchantInterfaceContext.Consumer;
export const MerchantInterfaceProvider = MerchantInterfaceContext.Provider;

export const withContext = (Consumer) => (Component) => (props) =>
  (
    <Consumer>
      {(context) => <Component {...props} context={context} />}
    </Consumer>
  );
