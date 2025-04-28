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
        res.status(200).json(
            {
                length: tasks.length,
                tasks,
            }
        );
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

export const getTask = asyncHandler(async (req, res) => {
    try {
        const  userId = req.user._id;
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        const task = await TaskModel.findOne({ _id: id, user: userId });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);

    } catch (error) {
        return res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
}
);

export const updateTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, status, priority } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        const task = await TaskModel.findOne({ _id: id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.completed = completed || task.completed;

        await task.save();

        res.status(200).json({
            message: 'Task updated successfully',
            task,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});