module.exports = {
  paths: {
   

    "/api/auth/register": {
      post: {
        summary: "Register new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Register" },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully" },
          400: { description: "Validation error" },
        },
      },
    },

    "/api/auth/verify": {
      post: {
        summary: "Verify account by OTP",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VerifyOTP" },
            },
          },
        },
        responses: {
          200: { description: "User verified successfully" },
          400: { description: "Invalid or expired OTP" },
          404: { description: "User not found" },
        },
      },
    },

    "/api/auth/resend/otp": {
      post: {
        summary: "Resend OTP to email",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ResendOTP" },
            },
          },
        },
        responses: {
          200: { description: "OTP resent successfully" },
          404: { description: "User not found" },
        },
      },
    },

    "/api/auth/forgot/password": {
      post: {
        summary: "Send reset OTP for password",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ForgotPassword" },
            },
          },
        },
        responses: {
          200: { description: "Reset OTP sent successfully" },
          404: { description: "User not found" },
        },
      },
    },

    "/api/auth/reset/password": {
      post: {
        summary: "Reset password using OTP",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ResetPassword" },
            },
          },
        },
        responses: {
          200: { description: "Password reset successfully" },
          400: { description: "Invalid OTP or validation error" },
          404: { description: "User not found" },
        },
      },
    },

    "/api/auth/login": {
      post: {
        summary: "Login",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Login" },
            },
          },
        },
        responses: {
          200: { description: "Login success" },
          400: { description: "Invalid credentials" },
        },
      },
    },

    "/api/auth/refresh": {
      post: {
        summary: "Refresh access token",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RefreshToken" },
            },
          },
        },
        responses: {
          200: { description: "Token refreshed successfully" },
          400: { description: "Invalid refresh token" },
        },
      },
    },

 
    "/api/cars/all": {
      get: {
        summary: "Get all cars",
        tags: ["Cars"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "List of cars" },
          401: { description: "Unauthorized" },
        },
      },
    },

    "/api/cars/create": {
      post: {
        summary: "Create new car",
        tags: ["Cars"],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Car" },
            },
          },
        },
        responses: {
          201: { description: "Car created successfully" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
        },
      },
    },

    "/api/cars/{id}": {
      get: {
        summary: "Get car by Id",
        tags: ["Cars"],
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/CarId" }],
        responses: {
          200: { description: "Car found" },
          400: { description: "Invalid ObjectId" },
          401: { description: "Unauthorized" },
          404: { description: "Car not found" },
        },
      },

      put: {
        summary: "Update car by Id",
        tags: ["Cars"],
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/CarId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Car" },
            },
          },
        },
        responses: {
          200: { description: "Car updated successfully" },
          400: { description: "Invalid ObjectId" },
          401: { description: "Unauthorized" },
          404: { description: "Car not found" },
        },
      },

      delete: {
        summary: "Delete car by Id",
        tags: ["Cars"],
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/CarId" }],
        responses: {
          200: { description: "Car deleted successfully" },
          400: { description: "Invalid ObjectId" },
          401: { description: "Unauthorized" },
          404: { description: "Car not found" },
        },
      },
    },



    "/api/categories/all": {
      get: {
        summary: "Get all categories",
        tags: ["Categories"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "List of categories" },
          401: { description: "Unauthorized" },
        },
      },
    },

    "/api/categories/create": {
      post: {
        summary: "Create new category",
        tags: ["Categories"],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Category" },
            },
          },
        },
        responses: {
          201: { description: "Category created successfully" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          403: { description: "Admin only" },
        },
      },
    },

    "/api/categories/{id}": {
      get: {
        summary: "Get category by Id",
        tags: ["Categories"],
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/CategoryId" }],
        responses: {
          200: { description: "Category found" },
          400: { description: "Invalid ObjectId" },
          401: { description: "Unauthorized" },
          404: { description: "Category not found" },
        },
      },

      put: {
        summary: "Update category by Id",
        tags: ["Categories"],
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/CategoryId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Category" },
            },
          },
        },
        responses: {
          200: { description: "Category updated successfully" },
          400: { description: "Invalid ObjectId" },
          401: { description: "Unauthorized" },
          403: { description: "Admin only" },
          404: { description: "Category not found" },
        },
      },

      delete: {
        summary: "Delete category by Id",
        tags: ["Categories"],
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/CategoryId" }],
        responses: {
          200: { description: "Category deleted successfully" },
          400: { description: "Invalid ObjectId" },
          401: { description: "Unauthorized" },
          403: { description: "Admin only" },
          404: { description: "Category not found" },
        },
      },
    },

    "/api/categories/{id}/cars": {
      get: {
        summary: "Get cars of a category",
        tags: ["Categories"],
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/CategoryId" }],
        responses: {
          200: { description: "Cars of category" },
          400: { description: "Invalid ObjectId" },
          401: { description: "Unauthorized" },
          404: { description: "Category not found" },
        },
      },
    },
  },
};