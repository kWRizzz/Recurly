import{
    z
}from "zod"


export const loginSchema= z.object({
    email:z.email("enter valid email"),
    password:z.string().min(4,"pass must be atleast of 4 chars")
})

export type loginFromData= z.infer<typeof loginSchema>