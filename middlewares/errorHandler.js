const errorHandler = (err, req, res, next) => {
   console.log(err)

   if (err.name === 'ErrorNotFound') {
      res.status(404).json({
         name: 'Error not found',
         message: err.message
      })
   } else {
      res.status(500).json({ message: 'Internal server error' })
   }
}

module.exports = errorHandler