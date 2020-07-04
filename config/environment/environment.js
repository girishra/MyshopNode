module.exports = {
    development: {
		db: "mongodb://localhost:27017/MyShop",
		jwt: {
			secretOrKey: process.env.SECRET || "MySHop",
			algorithm: "HS256",
			expiresIn: "30days",
			issuer: "girish",
			audience: "not sure"
		}
    },
    production: {
		db: process.env.DB_LIVE,
		jwt: {
		secretOrKey: process.env.SECRET || "MySHop",
		algorithm: "HS256",
		expiresIn: "30days",
		issuer: "girish",
		audience: "not sure"
		}
    }
  }[process.env.NODE_ENV || "development"];
  // process.env.DB_DEV
