import asyncHandler from 'express-async-handler';
import TaskModel from '../../models/task/TaskModel.js';

const createTask = asyncHandler(async (req, res) => {
   res.send('create task route');
});

export default createTask;