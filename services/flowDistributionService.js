const Astrologer = require('../models/astrologer');

let totalConnections = 0;
let topAstrologers = [];

const initialize = async () => {
  topAstrologers = await Astrologer.find({ topAstrologer: true });
};

const getAstrologer = async () => {
  let astrologers = await Astrologer.find({ topAstrologer: false });
  let availableAstrologers = [...topAstrologers, ...astrologers];

  let minConnections = Math.min(...availableAstrologers.map(a => a.connections));
  let selectedAstrologers = availableAstrologers.filter(a => a.connections === minConnections);

  return selectedAstrologers[Math.floor(Math.random() * selectedAstrologers.length)];
};

const connectUser = async (userId) => {
  let astrologer = await getAstrologer();
  astrologer.connections += astrologer.topAstrologer ? astrologer.flowMultiplier : 1;
  await astrologer.save();

  let user = await User.findById(userId);
  user.connectedAstrologer = astrologer._id;
  await user.save();

  totalConnections++;
};

const toggleTopAstrologer = async (astrologerId, topAstrologer, flowMultiplier) => {
  let astrologer = await Astrologer.findById(astrologerId);
  astrologer.topAstrologer = topAstrologer;
  astrologer.flowMultiplier = flowMultiplier || 1;
  await astrologer.save();
};

module.exports = { initialize, connectUser, toggleTopAstrologer };
