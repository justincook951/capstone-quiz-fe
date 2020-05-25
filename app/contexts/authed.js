import React from 'react';

const AuthedContext = React.createContext();

export default AuthedContext
export const AuthedConsumer = AuthedContext.Consumer;
export const AuthedProvider = AuthedContext.Provider;