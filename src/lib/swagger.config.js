const component = require("../documentation/componenets");
const postDocs = require("../documentation/post/post.docs");

module.exports = {
  openapi: "3.0.0",

  info: {
    title: "Swagger lesson",
    version: "1.0.0"
  },

  components: {


    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },

    schemas: {
      ...component.components.schemas
    },

    parameters: {
      ...component.components.parameters
    }

  },

  paths: {
    ...postDocs.paths
  }

};