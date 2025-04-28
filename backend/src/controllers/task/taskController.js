import asyncHandler from 'express-async-handler';
import TaskModel from '../../models/task/TaskModel.js';

export const createTask = asyncHandler(async (req, res) => {
    try{
        const { title, description, dueDate, status, priority } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!description || description.trim() === '') {
            return res.status(400).json({ message: 'Description is required' });
        }

        const task = new TaskModel({
            title,
            description,
            dueDate: dueDate || Date.now(),
            status: status || 'active',
            priority: priority || 'low',
            user: req.user._id,
        });
        
        await task.save();

        res.status(201).json({
            message: 'Task created successfully',
            task: {
                id: task._id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status: task.status,
                priority: task.priority,
            },
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error creating task', error: error.message });
    }
});

export const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await TaskModel.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});


