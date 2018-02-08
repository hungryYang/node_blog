 //创建schema

const {Schema} = require('mongoose');

//博客分类

const categorySchema = new Schema({
  name:  String,
  id:String
});


//博客存储
const blogSchema = new Schema({
  title:  String,
  rawContent:String, //markdown
  content:   String, //html
  category:categorySchema,//分类
  date: String
},{
  _id:false,// _id为false 告诉mongoose不要操作_id
  strict:false
});



module.exports ={
  categorySchema,
  blogSchema
}