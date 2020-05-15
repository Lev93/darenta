const { Router } = require('express');
const Menu = require('../models/menu');

const router = Router();

router.get('/', async (req, res) => {
  await Menu.find().then((documents) => {
    const context = {
      usersDocuments: documents.map((document) => {
        return {
          text: document.text,
          link: document.link,
          img: document.img,
        };
      }),
    };

    res.render('index', {
      menus: context.usersDocuments,
      title: 'дарента',
    });
  });

});

module.exports = router;
