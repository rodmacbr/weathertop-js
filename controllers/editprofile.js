"use strict";

const userStore = require('../models/user-store');

const editprofile = {
  index(request, response) {
    const viewData = {
      title: "Edit User Profile"
    };
    const user = userStore.getUserByEmail(request.cookies.station);
    console.log(request.cookies.station);
    response.render("editprofile", user);
  },

  update(request, response) {
    userStore.updateUser(request.params.id, request.body);
    response.redirect('/editprofile');
  }
};

module.exports = editprofile;
