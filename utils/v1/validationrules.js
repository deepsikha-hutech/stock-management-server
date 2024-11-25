export const LOGIN_RULE = {
  email: {
    mandatory: true,
    allowNull: false,
    type: "email",
    required: true,
    message: "Please enter a valid email address",
  },
  password: {
    mandatory: true,
    allowNull: false,
    type: "string",
    required: true,
    message: "Please enter a password",
  },
};

export const SIGNUP_RULE = {
  name: {
    type: "string",
    mandatory: true,
    allowNull: false,
    minLength: 3,
    required: true,
    message: "Please enter your name",
  },
  email: {
    type: "email",
    required: true,
    mandatory: false,
    allowNull: false,
    message: "Please enter a valid email address",
  },
  password: {
    type: "string",
    required: true,
    allowNull: false,
    minLength: 6,
    message: "Please enter a password",
  },
};
