const errorMiddleware = () => {
  try {
    let error = {... err};

    error.message = err.message;

    console.error(err);

    //Mongoose bad ObjectId

    if(err.name === 'CastError'){
        const message = 'Resource not found';
    
    error = new Error(message);
    error.statusCode = 404;
    }

    //Mongoose duplicate key
    if(err.code === 11000){
        const message = 'Duplicate field value entered'
        error = new Error(message);
        error.statusCode = 400
    }

    //Mongoose validation error
    if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message);
    error = new Error(message.join(','));
    error.statusCode = 400
    }

    res.send(error.statusCode || 500).json({sucess: false , error: error.message || 'Server Error'});
  } catch (error) {
    next(error)
  }
};

export default errorMiddleware;

//Create a subscription --> middleware (check for renewal date) --> middleware(check for errors) --> next --> controller
/*
Complete Flow

User sends

{
    "email": "abc",
    "price": -100
}

↓

Mongoose checks schema

↓

Finds

Invalid email
Invalid price

↓

Throws

ValidationError

↓

Error middleware runs

↓

Extracts

[
    "Please enter a valid email",
    "Price must be greater than 0"
]

↓

Joins them

Please enter a valid email, Price must be greater than 0

↓

Sends

{
    "success": false,
    "message": "Please enter a valid email, Price must be greater than 0"
}

with status code 400
*/