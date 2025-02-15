import bcrypt from "bcrypt"

import userRepository from "../repositories/userRepository.js";
import { createJwt } from "../utils/common/authUtils.js";
import ClientError from "../utils/errors/ClientError.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const userSignUpService = async (data) => {
  try {
      const newuser = await userRepository.create(data);
      return newuser;
  } catch (error) {
      if (error.name === 'ValidationError') {
          throw new ValidationError(
            {
              error: error.errors
            },
            error.message
          );
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
          throw new ValidationError(
            {
              error: ['user with same email already exists']
            },
            'user with same email already exists'
          );
      }
  }
}

export const userSignInService = async (data) => {
  
  const user = await userRepository.findByEmail(data.email);

  if(!user){
    throw new ClientError({
      explanation :'User with this Email Does not exist',
      message :'User with this email does not exist'
    })
  }

  const isValidPassword = bcrypt.compareSync(data.password, user.password);

  if(!isValidPassword){
    throw new ClientError({
      explanation :'Incorrect Password sent by the Client',
      message :'Incorrect Password. Plz try Again'
    })
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: createJwt({_id: user._id, email : user.email, role: user.role})
  }

}