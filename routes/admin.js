const { Router } = require('express');
const Menu = require('../models/menu');

const router = Router();
router.get('/', async (req, res) => {
  res.render('adminlogin', {
    layout: 'admin.hbs',
    title: 'Вход',
  });
});

router.post('/login', async (req, res) => {
    try {
      const { login, password } = req.body;
      if (login === 'admin', password === 'admin') {
        await Menu.find().then((documents) => {
            const context = {
              usersDocuments: documents.map((document) => {
                return {
                  text: document.text,
                  link: document.link,
                  img: document.img,
                  id: document._id,
                };
              }),
            };
        
            res.render('admin', {
              layout: 'admin.hbs',
              menuItems: context.usersDocuments,
              title: 'Панель админа',
            });
          });
      }
    } catch (e) {
      console.log(e);
    }
});

router.post('/topmenuadd', async (req, res) => {
    try {
      const menu = new Menu({
        text: req.body.text,
        link: req.body.link,
        img: req.body.img,
      });
      await menu.save();
      await Menu.find().then((documents) => {
        const context = {
          usersDocuments: documents.map((document) => {
            return {
              text: document.text,
              link: document.link,
              img: document.img,
              id: document._id,
            };
          }),
        };
    
        res.render('admin', {
          layout: 'admin.hbs',
          menuItems: context.usersDocuments,
          title: 'Панель админа',
        });
      });
    } catch (e) {
      console.log(e);
    }
});

router.post('/topmenuremove', async (req, res) => {
    try {
    await Menu.deleteOne({ _id: req.body.id });
      await Menu.find().then((documents) => {
        const context = {
          usersDocuments: documents.map((document) => {
            return {
              text: document.text,
              link: document.link,
              img: document.img,
              id: document._id,
            };
          }),
        };
    
        res.render('admin', {
          layout: 'admin.hbs',
          menuItems: context.usersDocuments,
          title: 'Панель админа',
        });
      });
    } catch (e) {
      console.log(e);
    }
});




module.exports = router;
