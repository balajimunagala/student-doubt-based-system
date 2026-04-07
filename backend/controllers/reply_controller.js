const Reply = require("../models/reply_model");
const Doubt = require("../models/doubt_model");

const createReply = async (req, res) => {
  try {
    const { doubtId } = req.params;
    const { senderId, message } = req.body;

    const doubt = await Doubt.findById(doubtId);

    if (!doubt) {
      return res.status(404).json({
        message: "Doubt not found",
      });
    }

    const reply = await Reply.create({
      doubtId,
      senderId,
      message,
    });

    await Doubt.findByIdAndUpdate(doubtId, {
      status: "answered",
    });

    res.status(201).json({
      message: "Reply sent successfully",
      reply,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRepliesByDoubt = async (req, res) => {
  try {
    const { doubtId } = req.params;

    const replies = await Reply.find({ doubtId })
      .populate("senderId", "name role")
      .sort({ createdAt: 1 });

    res.status(200).json({
      message: "Replies fetched successfully",
      replies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createReply,getRepliesByDoubt };