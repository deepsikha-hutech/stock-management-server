import { connectToDatabase } from "../db.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

import { DBCRUD } from "../dbcrud.js";
import { createToken } from "./crypto.js";

export async function loginUserUtil(email, password) {
  try {
    const userDBCRUD = new DBCRUD("users");
    await userDBCRUD.initialize();
    const user = await userDBCRUD.findOne({ email, password });
    console.log(user);

    if (user) {
      const { password, ...userInfo } = user;
      const accesstoken = await createToken(userInfo);
      return {
        statusCode: 200,
        message: "login successful",
        ...accesstoken,
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid credentials",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function signupUserUtil(userInfo) {
  try {
    const userDBCRUD = new DBCRUD("users");
    await userDBCRUD.initialize();
    const { inserted, data: user } = await userDBCRUD.findOneOrCreateOne(
      { email: userInfo.email },
      {},
      userInfo
    );

    if (user) {
      return {
        statusCode: 200,
        user,
        inserted,
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}
