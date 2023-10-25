type ValidatorType = {
  email: RegExp;
  password: RegExp;
  "password-login": RegExp;
  any: RegExp;
};

export const VALIDATOR: ValidatorType = {
  email: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+/g,
  "password-login": /^\w{1,40}$/,
  any: /^\w{1,40}$/,
};

export const VALIDATOR_MESSAGES = {
  email: "Email is not valid",
  "password-login": "Password is required",
  password:
    "Password must contain at least one uppercase letter, one lowercase letter and one number",
  any: "This field is required",
};

export const validateInput = ({
  key,
  value,
}: {
  key: string;
  value: string;
}): string => {
  if (!value) return VALIDATOR_MESSAGES.any;

  const validatorKey = key as keyof ValidatorType;
  if (!VALIDATOR[validatorKey]) {
    return "This field is required";
  }
  console.log("paso");
  if (!VALIDATOR[validatorKey].test(value))
    return VALIDATOR_MESSAGES[validatorKey];

  return "";
};

// export const setErrors = ({ setState, state }: { setState: any; state:any }): void => {

//   for(const prop in state){
//     setState({
//       ...state,
//       prop: validateInput({key: prop, value: state[prop]})
//     })
//   }

// };
