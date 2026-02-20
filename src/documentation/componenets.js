module.exports = {
  components: {

    schemas: {

     Register: {
        type: "object",
        properties: {
          firstname: {
            type: "string",
            default: "Imomali",
            minLength: 6, 
            maxLength: 20
          },
          lastname: {
            type: "string",
            default: "Aliyev",
            minLength: 6, 
            maxLength: 20
          },
          email: {
            type: "string",
            format: "email",
            default: "imomali@gmail.com",
          },
          password: {
            type: "string",
            default: "12345678",
            minLength: 8
          },
        },
        required: ["firstname", "lastname", "email", "password"],
      },

      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            default: "imomali@gmail.com",
          },
          password: {
            type: "string",
            default: "12345678",
            minLength: 8
          },
        },
        required: ["email", "password"],
      },

      VerifyOTP: {
        type: "object",
        properties: {
          email: {
            type: "string",
            default: "imomali@gmail.com",
          },
          otp: {
            type: "string",
            default: "123456",
          },
        },
        required: ["email", "otp"],
      },

      ForgotPassword: {
        type: "object",
        properties: {
          email: {
            type: "string",
            default: "imomali@gmail.com",
          },
        },
        required: ["email"],
      },

      ResetPassword: {
        type: "object",
        properties: {
          email: {
            type: "string",
            default: "imomali@gmail.com",
          },
          otp: {
            type: "string",
            default: "123456",
          },
          newPassword: {
            type: "string",
            default: "newpassword123",
          },
        },
        required: ["email", "otp", "newPassword"],
      },

      RefreshToken: {
        type: "object",
        properties: {
          refreshToken: {
            type: "string",
            default: "your_refresh_token_here",
          },
        },
        required: ["refreshToken"],
      },


      Car: {
        type: "object",
        properties: {

          car_name: {
            type: "string",
            default: "Chevrolet Malibu",
          },

          model: {
            type: "string",
            default: "Premier",
          },

          year: {
            type: "integer",
            default: 2022,
          },

          color: {
            type: "string",
            default: "Black",
          },

          distance: {
            type: "integer",
            default: 30000,
          },

          gearbox: {
            type: "string",
            enum: ["Manual", "Avtomat"],
            default: "Avtomat",
          },

          description: {
            type: "string",
            default: "Full options",
          },

          car_image: {
            type: "string",
            default: "car.png",
          },

          price: {
            type: "number",
            default: 25000,
          },

          category_id: {
            type: "string",
            default: "6997ff6af30a0464f24a80520",
          },

          user_id: {
            type: "string",
            default: "69980041f30a0464f24a8058",
          },

        },

        required: [
          "car_name",
          "model",
          "year",
          "color",
          "distance",
          "gearbox",
          "price",
          "category_id",
        ],
      },


     

      Category: {
        type: "object",
        properties: {

          category_name: {
            type: "string",
            default: "Sedan",
          },

          description: {
            type: "string",
            default: "Sedan cars category",
          },

        },

        required: ["category_name"],
      },

    },


    parameters: {

      CarId: {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "Car ObjectId",
        default: "69980041f30a0464f24a8058",
      },

      CategoryId: {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "Category ObjectId",
        default: "6997ff6af30a0464f24a8052",
      },

      UserId: {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "User ObjectId",
        default: "",
      },

    },

  },
};