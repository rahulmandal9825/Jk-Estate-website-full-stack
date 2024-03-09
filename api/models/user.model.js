import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    
    },
    avatar:{
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1gDr3mJkyRbAfAMzrUi-4T&ust=1709632250193000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMii7cmq2oQDFQAAAAAdAAAAABAE '
    },
    },
    {timestamps:true}
  );

const User = mongoose.model("User", UserSchema);

export default User;