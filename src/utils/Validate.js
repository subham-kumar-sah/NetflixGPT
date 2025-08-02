const Validate = (name, email, password1, password2, isSignIn) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password1
  );
  if (isSignIn) {
    if (!emailRegex) {
      return "Please enter a valid email address.";
    }
    if (!passwordRegex) {
      return "Password must be at least 8 characters long and contain at least one letter and one number.";
    }
    return null;
  } else {
    const nameRegex = /^[a-zA-Z\s]+$/.test(name);
    if (!emailRegex) {
      return "Please enter a valid email address.";
    }
    if (!passwordRegex) {
      return "Password must be at least 8 characters long and contain at least one letter and one number.";
    }
    if (!nameRegex) {
      return "Name can only contain letters and spaces.";
    }
    if (password1 !== password2) {
      return "Passwords do not match.";
    }
    return null;
  }
};

export default Validate;
