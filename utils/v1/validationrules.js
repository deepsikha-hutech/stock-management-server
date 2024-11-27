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

export const UPDATE_STOCK_RULE = {
  customerid: {
    mandatory: true,
    allowNull: false,
    type: "string",
    message: "Please enter a customerid",
  },
  name: {
    mandatory: true,
    allowNull: false,
    type: "string",
    message: "Please enter a name",
  },
  status: {
    allowNull: false,
    type: "boolean",
    message: "Status must be either active(true) or inactive(false)",
    allowedValues: [true, false],
  },

  riskprofile: {
    type: "string",
    allowNull: false,
  },
  portfoliovalue: {
    type: "number",
    allowNull: false,
  },
  sipamount: {
    type: "number",
    allowNull: false,
  },
  adhocinv: {
    type: "number",
    allowNull: false,
  },
  modelportfolio: {
    type: "string",
    allowNull: false,
  },
  thematicinv: {
    type: "string",
    allowNull: false,
  },
  lastupdated: {
    type: "string",
    allowNull: false,
  },
};

export const NEW_STOCK_RULE = {
  customerid: {
    mandatory: true,
    allowNull: false,
    type: "string",
    message: "Please enter a customerid",
  },
  name: {
    mandatory: true,
    allowNull: false,
    type: "string",
    message: "Please enter a name",
  },
  status: {
    allowNull: false,
    type: "boolean",
    message: "Status must be either active(true) or inactive(false)",
    allowedValues: [true, false],
  },

  riskprofile: {
    type: "string",
    allowNull: false,
  },
  portfoliovalue: {
    type: "number",
    allowNull: false,
  },
  sipamount: {
    type: "number",
    allowNull: false,
  },
  adhocinv: {
    type: "number",
    allowNull: false,
  },
  modelportfolio: {
    type: "string",
    allowNull: false,
  },
  thematicinv: {
    type: "string",
    allowNull: false,
  },
  lastupdated: {
    type: "string",
    allowNull: false,
  },
};
