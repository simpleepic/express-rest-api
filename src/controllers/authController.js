const jwt = require("jsonwebtoken")
const {promisify} = require("util")

const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error/appError");

const signToken = (id) => {
  return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN*24*60*60*1000),
    httpOnly: true
  }

  // Enable secure http (https) only at the production mode
  if(process.env.NODE_ENV === "production"){    
    cookieOptions.secure = true
  }

  // Remove the password from the user payload
  user.password = undefined

  res.status(statusCode).json({status: "success", data: {user: user, token: token}});
}


// Signup
const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  if(!newUser) {
    return next(new AppError("User is not created", 404))
  }

  createSendToken(newUser, 201, res)
});

const login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;

  if(!email || !password){
    return next(new AppError("Please enter your email and password", 401))
  }

  // Check if the user is already exists or not
  const user = await User.findOne({email}).select("+password")

  if(!user){
    return next(new AppError("User is not found", 404));
  }

  if(!(await user.passwordCheck(password, user.password))){
    return next(new AppError("User password is not matching", 404));
  }

  createSendToken(user, 200, res)
} )

// Autorization Middlewares
const protectRoute = catchAsync(async (req, res, next) => {
  console.log("Protected route");

  let token;

  // Pre-process the authorization headers to obtain JWT
  // Authorization-Header: Bearer jbisufg23ubifu2bifu2b3ifb2i
  // ["Bearer", "jbisufg23ubifu2bifu2b3ifb2i"]
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    // 1) Obtain JWT using authorization headers
    token = req.headers.authorization.split(" ")[1]
  }else if (req.cookies.jwt){
    // 2) Obtain JWT using cookies stored in the frontend(Browser)
    token = req.cookies.jwt;
  }

  if(!token){
    return next(new AppError("You are not logged in!", 401))
  } 

  // Decode and Verify JWT
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // Check whether the user is exists or not
  const currentUser =  await User.findById(decoded.id)

  if(!currentUser){
    return next(new AppError("User is not exists", 401))
  }

  // Check whether the token is expired or not
  if(!currentUser.tokenAvailabilityCheck(decoded.iat)) {
    return next(new AppError("User has changed the password! Please login again", 401))
  }

  // Grant the access to the user
  req.user = currentUser;

  next();
})

// Role-based authentication Middleware
const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if(!roles.includes(req.user.role)){
      return next(new AppError("Your dont have permission for access this resrouce", 403))
    }

  next();
  }
}

module.exports = { signup ,login, protectRoute, restrictTo};
