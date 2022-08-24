const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const userToUpdate = await User.findById(_id);

  if (userToUpdate.subscription === req.body.subscription) {
    return res.status(400).json({
      message: `Subscription wasn't changed (this user has already subscription:${req.body.subscription}). If wou want to change subscription - you have to change your request`,
    });
  }

  await User.findByIdAndUpdate(_id, { $set: req.body });
  res
    .status(200)
    .json({ message: `Subscription was updated to ${req.body.subscription}` });
};

module.exports = updateSubscription;
