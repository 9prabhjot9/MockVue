import { v } from "convex/values";
import { mutation } from "./_generated/server";

//inser update or delete a record use mutation when fetch a recird use query
export const CreateNewUser = mutation ({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string()
    },
    handler: async(ctx, args) => {

        //if user already exist
        const user = await ctx.db.query('UserTable').filter(
            q=>q.eq(q.field('email'), args.email)).collect()

        //if user not exist then insert to DB
        if(user?.length == 0)
        {
            const data = {
                email: args.email,
                name: args.name,
                imageUrl: args?.imageUrl
            }
            const result = await ctx.db.insert('UserTable', {
                ...data
            })
            console.log(result)
            return {
                ...data
            }
        }


        return user[0]
    }
})