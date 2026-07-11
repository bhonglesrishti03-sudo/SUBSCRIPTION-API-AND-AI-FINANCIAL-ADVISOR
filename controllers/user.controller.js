import User from '../models/user.model.js';


export const getUsers = async ( req , res , next) => {
    try {
      const users = await User.find();

      res.status(200).json({success: true , data: users});
    } catch (error) {
    next()
    }
}

export const getUser = async(req , res , next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success:true , data: user})
    } catch (error) {
        next(error)
    }
}

/*
// req.params  -> Route parameters
// Example: /users/:id
// Access using: req.params.id

// req.query   -> Query string parameters
// Example: /users?id=123
// Access using: req.query.id

// req.body    -> Data sent in request body
// Example: POST/PUT/PATCH JSON
// Access using: req.body.name

// req.headers -> Request headers
// Example: Authorization token
// Access using: req.headers.authorization

*/