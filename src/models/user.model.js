import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            require:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            require:true,

        },
        coverImg:{
            type:String //cloudinary url
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Video'
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type:String
        }
    },
    { timestamps: true });

    //password hashing middleware
    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10);
        next();
    })
    //password comparison method
    userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
    }
    userSchema.methods.generateAccsessToken = function () {
        jwt.sign({
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName, 
       },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRATION || '1h'
        },
    )
    }

    userSchema.methods.generateRefreshToken = function () {
         jwt.sign({
            _id: this._id,
       },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d'
        },
    )
    }

export const User = mongoose.model("User", userSchema);
