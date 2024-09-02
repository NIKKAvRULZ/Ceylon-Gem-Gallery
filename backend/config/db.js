const mongoose = require("mongoose");

const dburl = "mongodb+srv://nithika151:nithika2003@cluster0.izvno6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery",true,"useNewUrlParser",true);

const connection = async () => {
    try{
        await mongoose.connect(dburl);
        console.log("MongoDB Connected");
    }catch{
        console.error(e.message);
        process.exit();
    }
};

module.exports = connection;