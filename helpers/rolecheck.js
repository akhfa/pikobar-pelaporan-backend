const ObjectId = require("mongoose").Types.ObjectId
const countByRole = (user) => {
  let searching
  if (user.role == "dinkeskota") {
    searching = {
      author:new ObjectId(user._id)
    }
  } else if (user.role == "dinkesprov" || user.role == "superadmin") {
    searching = {}
  } else {
    searching = {
      author:new ObjectId(user._id),
      author_district_code:user.code_district_city
    }
  }
  return searching
}

const exportByRole = (params, user) => {
  if (user.role == "dinkeskota") {
    params.author_district_code = user.code_district_city;
  } else if (user.role == "dinkesprov" || user.role == "superadmin") {
    return true;
  } else {
    params.author = new ObjectId(user._id);
    params.author_district_code = user.code_district_city;
  }
  return params
}

const userByRole = (params, user) => {
  if (user.role == "dinkeskota") {
    params.author_district_code = user.code_district_city;
  } else {
    return true;
  }
  return params
}

const listByRole = (user, params, search_params, schema, conditions) => {
  let result_search
  if (search_params == null) {
    if(user.role == "dinkeskota"){
      params.author_district_code = user.code_district_city;
      result_search = schema.find(params).where(conditions).ne("deleted")
    }else if (user.role == "dinkesprov" || user.role == "superadmin") {
      result_search = schema.find(params).where(conditions).ne("deleted")
    } else {
      result_search = schema.find({
        "author":new ObjectId(user._id),
        "author_district_code":user.code_district_city,
      }).where(conditions).ne("deleted")
    }
  } else {
    if(user.role == "dinkeskota"){
      params.author_district_code = user.code_district_city;
      result_search = schema.find(params).or(search_params).where(conditions).ne("deleted")
    }else if (user.role == "dinkesprov" || user.role == "superadmin") {
      result_search = schema.find(params).or(search_params).where(conditions).ne("deleted")
    } else {
      result_search = schema.find({
        "author":new ObjectId(user._id),
        "author_district_code":user.code_district_city
      }).or(search_params).where(conditions).ne("deleted")
    }
  }
  return result_search
}

module.exports = {
  countByRole,
  exportByRole,
  listByRole,
  userByRole
}