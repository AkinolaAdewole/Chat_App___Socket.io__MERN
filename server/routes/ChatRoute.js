import express from 'express';
const router = express.Router();

import {createChat, findChat, userChats} from '../controllers/ChatController.js'

router.post('/',createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

export default router;