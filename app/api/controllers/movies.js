const movieModel = require('../models/movies');

module.exports = {
  getById: async function (req, res, next) {
    console.log(req.body);
    try {
      const movieInfo = await movieModel.findById(req.params.movieId);

      //sending json response to route
      res.json({
        status: "success",
        message: "Movie found!!!",
        data: {
          movies: movieInfo
        }
      });

    } catch (err) {
      next(err);
    }


  },
  getAll: async function (req, res, next) {
    let moviesList = []; //letting an empty array list

    try {
      const movies = await movieModel.find({});
      //adding movies to array list
      for (let movie of movies) {
        moviesList.push({
          id: movie._id,
          name: movie.name,
          released_on: movie.released_on
        });
      }

      //sending response as json 
      res.json({
        status: "success",
        message: "Movies list found!!!",
        data: {
          movies: moviesList
        }
      });

    } catch (err) {
      next(err);
    }


  },
  updateById: async function (req, res, next) {

    try {
      const movieInfo = await movieModel.findByIdAndUpdate(req.params.movieId);

      if (movieInfo === null) {
        res.json({
          status: "error",
          message: "Data not found",
          data: movieInfo
        });
      } else {
        res.json({
          status: "success",
          message: "Movie updated successfully!!!",
          data: null
        });
      }
    } catch (error) {
      next(err); //sending error to route using next
    }

  },
  deleteById: async function (req, res, next) {

    try {
      const movieInfo = await movieModel.findByIdAndRemove(req.params.movieId);

      if (movieInfo === null) {
        res.json({
          status: "error",
          message: "Data not found",
          data: movieInfo
        });
      } else {
        res.json({
          status: "success",
          message: "Movie deleted successfully!!!",
          data: movieInfo
        });
      }

    } catch (error) {
      next(error); //sending error to route using next
    }
  },
  create: async function (req, res, next) {



    try {

      const movie = new movieModel({
        name: req.body.name,
        released_on: req.body.released_on
      });


      const result = await movie.save(); //saving new datamodel to documents

      //sending response back to user
      res.json({
        status: "success",
        message: "Movie added successfully!!!",
        data: result
      });

    } catch (err) {
      next(err); //sending error to route
    }
  },
}