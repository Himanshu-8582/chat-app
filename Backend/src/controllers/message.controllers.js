import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "../utils/cloudinary.js";

const getAllContacts = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
    "-password",
  ); // fetch all except loggedInUser
  return res
    .status(200)
    .json(new ApiResponse(200, "feteched all contacts", filteredUser));
});

const getChatPartners = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  // find all the messages where the logged-in user is either sender or receiver
  const messages = await Message.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });

  const chatPartnerIds = [
    ...new Set(
      messages.map((message) =>
        message.senderId.toString() === loggedInUserId.toString()
          ? message.receiverId.toString()
          : message.senderId.toString(),
      ),
    ),
  ];

  const cahtPartners = await User.find({ _id: { $in: chatPartnerIds } }).select(
    "-password",
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Fetched chat partners Successfully.", cahtPartners),
    );
});

const getMessagesByUserId = asyncHandler(async (req, res) => {
  const myId = req.user._id;
  const { id: userToChatId } = req.params;

  // To filter me to you && you to me messages
  const message = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "all messages are fetched", message));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let imageUrl;

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  if (!text && !image) {
    return res.status(400).json(new ApiResponse(400, 'Text or image is required'));
  }

  if (senderId.equals(receiverId)) {
    return res.status(400).json(new ApiResponse(400, 'Cant messege to yourself.'));
  }

  const receiverExist = await User.exists({ _id: receiverId });
  if (!receiverExist) {
    return res.status(404).json(new ApiResponse(404, 'Receiver not found'));
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });
  await newMessage.save();

  // To do send message to user if he/she is online - ( we can done it by socket.IO )

  return res
    .status(200)
    .json(new ApiResponse(200, "Message sent successfully", newMessage));
});

export { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage };
