const router = require('express').Router();
const { Club, Book } = require('../models');

router.get('/:id')