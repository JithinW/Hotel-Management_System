function validateInputs(name: string, value: any) {

  const usernamePattern = /^[a-zA-Z0-9]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let isValid = false;

  if (name == "userName") {
    isValid = usernamePattern.test(value);
  }
  else if (name == "password") {
    isValid = passwordPattern.test(value);
  }

  return {
    isValid
  };
}

export default validateInputs
