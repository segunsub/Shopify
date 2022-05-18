plugins: [    
    new webpack.DefinePlugin({           
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),      
      API_HOST: JSON.stringify(process.env.API_HOST)
    })
  ]