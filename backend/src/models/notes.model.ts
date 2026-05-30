import mongoose,{
    Document,
    Schema,
    Types
} from "mongoose"

export interface INote extends Document{
    title:string;
    content:string;
    summary?:string;
    fileUrl?:string;
    user:Types.ObjectId;
}


const notesSchema= new Schema<INote>({
    title:{
      type: String,
      required: true,
      trim: true,
    },
    content:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        default:""
    },
    fileUrl:{
        type:String,
        default:""
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
}
)

export default mongoose.model<INote>("Note",notesSchema)