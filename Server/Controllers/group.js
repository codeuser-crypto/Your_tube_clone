const Group = require('../Models/group');
const User = require('../Models/Auth');

exports.createGroup = async (req, res) => {
  const { name, invitedEmails } = req.body;
  try {
    const group = new Group({ name, invitedEmails, createdBy: req.user.id, members: [req.user.id] });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroups = async (req, res) => {
  const { search } = req.query;
  try {
    const groups = await Group.find(search ? { name: { $regex: search, $options: 'i' } } : {}).populate('members', 'username');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.joinGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId);
    if (!group.members.includes(req.user.id)) {
      group.members.push(req.user.id);
      await group.save();
    }
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
