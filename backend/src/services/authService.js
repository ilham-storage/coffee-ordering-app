const prisma = require("../utils/prisma")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(username, password){
    const existingUser = await prisma.user.findUnique({
        where: {
            username,
        }
    });

    if(existingUser){
        return {
            success: false,
            message: "Username Sudah Terdaftar!"
        };
    }

    const hashedPassword = await bcrypt.hash(
        password, 
        10
    );

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });
    return {
        success: true,
        message: "Register Berhasil",
        user: {
            id: user.id,
            username: user.username
        }
    }
}

async function login(username, password){
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if(!user){
        return{
            success: false,
            message: "Username atau Password Salah!"
        };
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );


    if(!isMatch){
        return {
            success: false,
            message: "Username atau Password Salah!"
        };
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        success: true,
        message: "Login Berhasil",
        token
    };
}



module.exports = {
   register,
   login
}