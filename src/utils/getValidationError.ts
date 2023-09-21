type TypeWithKey<T> = {
  [key: string]: T;
};

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: "No hay red xc",
  };
  return codeMatcher[errorCode];
};
