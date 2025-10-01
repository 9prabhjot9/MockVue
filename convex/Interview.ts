import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const SaveInterviewQuestion = mutation({
    args:{
        questions:v.any(),
        uid: v.id('UserTable'),
        resumeUrl: v.optional(v.union(v.string(), v.null())),
        jobTitle: v.optional(v.union(v.string(), v.null())),
        JobDescription: v.optional(v.union(v.string(), v.null())),
    },
    handler: async(ctx,  args) =>{
        const result = await ctx.db.insert('InterviewSessionTable',{
            interviewQuestions: args.questions,
            resumeUrl: args.resumeUrl?? null,
            userId: args.uid,
            status: 'draft',
            jobTitle: args.jobTitle,
            JobDescription: args.JobDescription
        })

        return (result)
            
    }
})

export const GetInterviewQuestions = query({
    args:{
        interviewRecordId: v.id('InterviewSessionTable')
    },
    handler: async (ctx, args) => {
        const result =  await ctx.db.query('InterviewSessionTable')
        .filter(q => q.eq(q.field('_id'), args.interviewRecordId))
        .collect()

        return result[0]
    }
})