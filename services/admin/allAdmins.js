// const adminModel = require("../../models/adminModel");
// const allAdmins = async (request, response) => {
//   const admins = await adminModel.find({});
//   console.log(admins);
//   const count = await adminModel.find({}).count();
//   return response.json({
//     status: "Success",
//     message: "All Admins",
//     count,
//     admins,
//   });
// };

const adminModel = require("../../models/adminModel");

// module.exports = allAdmins;
const allAdmins = async (request, response) => {
  //Find All Admins
  const admins = await adminModel.find({});
  if (admins.length == 0) {
    return response.json({ status: "Error", message: "Oops!,No Admins" });
  }
  return response.json({
    status: "Success",
    message: "Congratulations,All Admins Retrived Succcefully",
    admins,
  });
};
module.exports = allAdmins;
