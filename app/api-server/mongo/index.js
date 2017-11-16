//创建model
const mongoose = require('mongoose')

const {blogSchema,categorySchema} = require('./schema');

const BlogModel = mongoose.model('Blog',blogSchema)
const CategoryModel = mongoose.model('Category',categorySchema)

const $_saveBlog = blog=>{
  let condition = {title:blog.title}
  blog.date = new Date().toLocaleString()
  return BlogModel.findOneAndUpdate(condition,blog,{
    new:true,
    upsert:true
  }).then(_blog=>{
    return {
      status:1,
      data:_blog
    }
  })
}

const $_saveCategory= category=>{
  return  CategoryModel.findOneAndUpdate({name:category.name},category,{
    upsert:true,
    new:true
  }).exec().then(_category=>{
      return {
          status:1,
          data:_category
      }
  })

}

//获取分类

const $_getCategoryList = query=>{
  return CategoryModel.find(query).exec().then(categoryList=>{
    return {
      status:1,
      data:categoryList
    }
  })
}
//获取博客详情
const $_getBlogDetail = query=>{
  let condition = {
    _id: mongoose.Types.ObjectId(query.id)
  }
  //_id==》 ObjectId
  return BlogModel.findOne(condition).then(blog=>{
    return {
      status:1,
      data:blog
    }
  })
}
//获取博客列表
const $_getBlogList = (query)=>{
  return BlogModel.find(query).exec().then(blogList=>{
    return {
      status:1,
      data:blogList
    }
  })
}

//删除博客
const $_deleteBlog=(blog)=>{
  let condition = {
    _id: mongoose.Types.ObjectId(blog.id)
  }
  return BlogModel.remove(condition).exec().then(_blog=>{
    return {
      status:1,
      data:'删除成功'
    }
  })
}
module.exports = {
  $_saveBlog,
  $_saveCategory,
  $_getCategoryList,
  $_getBlogDetail,
  $_getBlogList,
  $_deleteBlog
}