const { Router } = require('express');
const HotelServices = require('../services/hotels.service');
const validationHandler = require('../utils/middlewares/validationHandler');
const {
  hotelIdSchema,
  createHotelSchema,
  updateHotelSchema,
} = require('../utils/schemas/hotels');

const hotelsAPI = (app) => {
  const router = Router();
  app.use('/api/hotels', router);

  const hotelServices = new HotelServices();

  router.get('/', async (_req, res, next) => {
    try {
      const hotels = hotelServices.getAll();
      res.status(200).json({
        message: 'list hotels',
        data: hotels,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:id',
    validationHandler({ id: hotelIdSchema.required() }, 'params'),
    (req, res, next) => {
      try {
        const { id } = req.params;
        const hotel = hotelServices.getById(id);
        res.status(200).json({
          messahe: 'hotel',
          data: hotel,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', validationHandler(createHotelSchema), (req, res, next) => {
    try {
      const { body: hotel } = req;
      const createdHotel = hotelServices.create(hotel);
      res.status(201).json({
        message: 'hotel created',
        data: createdHotel,
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/', validationHandler(updateHotelSchema), (req, res, next) => {
    try {
      const { id, data } = req.body;
      const updatedHotel = hotelServices.update(id, data);
      res.status(200).json({
        message: 'hotel updated',
        data: updatedHotel,
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    '/',
    validationHandler({ id: hotelIdSchema.required() }),
    (req, res, next) => {
      try {
        const { id } = req.body;
        const deletedHotel = hotelServices.delete(id);
        res.status(200).json({
          message: 'hotel deleted',
          data: deletedHotel,
        });
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = hotelsAPI;
