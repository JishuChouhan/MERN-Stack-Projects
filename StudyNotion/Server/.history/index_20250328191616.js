const express = require('express');

const app = express();

app.use(express.json());

const courses = [
    {
        id: 1,
        title: 'Introduction to React',
        description: 'Learn the fundamentals of React and build your first application',
        duration: '3 hours',
        instructor: 'John Doe',
        students: 100

    }]
    