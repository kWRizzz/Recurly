import{
    z
}from "zod"


export const loginSchema= z.object({
    email:z.email("enter valid email"),
    password:z.string().min(4,"pass must be atleast of 4 chars")
})

export const registerSchema= z.object({
    name:z.string().min(3),
    email:z.email().trim(),
    password:z.string().trim()
})

export type loginFromData= z.infer<typeof loginSchema>

export type registerFormData= z.infer<typeof registerSchema>