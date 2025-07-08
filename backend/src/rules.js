import {z} from "zod";

const signUpBody = z.object({
    name: z.string().min(3,"Name must be atleast 3 characters.").max(26,"Name at max can have 26 characters."),
   
    email: z.string().email("Invalid email format.").min(11,"Email must be atleast 11 characters."),

    password: z.string().min(8,"Password must be 8 characters long.").regex(/[a-z]/,"Password must have a lowercase character.").regex(/[A-Z]/,"Password must have an uppercase character.").regex(/[0-9]/,"Password must have a number").regex(/[^A-Za-z0-9]/, "Password must have a special character."),

    PIN: z.string().regex(/^[0-9]{4,6}$/,"Invalid PIN input."),

    upiId: z.string().regex(/^[a-zA-Z0-9._-]{2,256}@[a-zA-Z0-9]{2,64}$/,"UPI ID must be in the format username@bank.")
})

const signInBody = z.object({
    email: z.string().email("Invalid email format.").min(11,"Email must be atleast 11 characters."),

    password: z.string().min(8,"Password must be atleast ").regex(/[a-z]/,"Password must include a lowercase letter.").regex(/[A-Z]/, "Password must include an uppercase character.").regex(/[0-9]/,"Password must have a number").regex(/[^A-Za-z0-9]/, "Password must have a special character.")
})

const transferBody = z.object({
    amount: z.number().min(1,"Minimum amount that can be transferred is 1."),
    receiverAccountId: z.string("Receiver account ID is required."),
    PIN: z.string().min(4,"PIN should be minimum 4 characters.").max(6,"PIN should be maximum 6 characters.")  
});

const topupBody = z.object({
    amount: z.number().min(1,"Minimum top up balance is 1.")
})

const changePinBody = z.object({
    oldPin: z.string().regex(/^[0-9]{4,6}$/," Invalid PIN input."),
    newPin: z.string().regex(/^[0-9]{4,6}$/,"Invalid PIN input.")
})
export {signUpBody,signInBody,transferBody,topupBody,changePinBody};