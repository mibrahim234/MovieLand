const { User } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

// get all users for dashboard view
// should this be in dashboard?
// still working on this
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const userData = allUsers.map((user) => user.get({ plain: true }));
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.username = newUserData.username;
      req.session.user_id = newUserData.id;
      res.status(200).json(newUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login validation
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(400).json('Incorrect username or password...');
      return;
    }

    const passwordData = await userData.validatePassword(req.body.password);

    if (!passwordData) {
      res.status(400).json('Incorrect username or password...');
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'Welcome aboard!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// check if its working 
router.put('/:id', async (req, res) => {
  try {
    const updatedUserData = await User.update(
      {
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;
  