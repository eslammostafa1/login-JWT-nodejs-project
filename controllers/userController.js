import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";
import mydb from "../config.js";

export const signup = (req, res ) => {
    console.log(req.body);

    const { name, email, password, passwordconfirm} = req.body;

    if (!(email && password && first_name && last_name)) {
        return res.render('signup',{
            message: 'all field are require.'
        })
    }

    mydb.query('select * from user where email=?', [email],
    async (error, data) => {
        if(error){
            console.log(error);
        }
        console.log(data)
        if( data.length > 0 ) {
            return res.render('signup',{
                message: 'email is already exist.'
            })
        } else if ( password !== passwordconfirm ) {
            res.render('signup',{
                message: 'password is not the same.'
            })
        }

        let hashPassword = await bycrpt.hash(password, 8);
        console.log(hashPassword)

        mydb.query('insert into user set ?', {name: name, email: email, password: hashPassword},
        (error, data) => {
            if(error) {
                console.log(error)
            } else {
                console.log(data)
                res.render('signup', { 
                message: 'User registered'
                });
            }
        })
    })

}

export const login = (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            res.render('login',{
                message: 'password or email is missing.'
            })
        }
        mydb.query("select * from user where email=?", [email],
        async (error, data) => {
            console.log(data)
            if (data.length <= 0){
                res.render('login',{
                    message: ' email not valid.'
                })
            }else {
                if(!(await bycrpt.compare(password, data[0].password))){
                    res.render('login',{
                        message: ' password not valid.'
                    })
                } else {
                    const id = data[0].id;
                    const token = jwt.sign({id: id},
                        process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_EXPIRES_IN 
                    })
                    console.log("the token : " + token)
                    const cookieOpt = {
                        expries: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly:true,
                    };
                    res.cookie("joes",token,cookieOpt);
                    res.status(200).redirect("/")
                }
            }
        })
    }
    catch (error){
        console.log(error)
    }
}; 
