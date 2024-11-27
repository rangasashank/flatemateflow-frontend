Flatmate Flow - Frontend

Flatmate Flow is a responsive web application designed for roommates to manage shared tasks, expenses, and notes. The frontend is built with React, Tailwind CSS, and Redux Toolkit, providing a modern, animated, and intuitive user experience.

Technologies Used

React: Component-based frontend library.
Redux Toolkit: State management for handling user and group data.
Tailwind CSS: For responsive and modern UI styling.
Framer Motion: Animation library for transitions and effects.
Vite: Fast development server and build tool.


Features


Authentication:
Login and register pages with form validation.

Dashboard:
View tasks assigned to the user with due dates.
View completed tasks, pinned notes, and unsettled expenses.

Task Management:
Add tasks with descriptions, assignees, and due dates.
Mark tasks as complete.
View recurring tasks (in progress).

Settings:
Leave group.

Admin-only features:
Add or remove members.
Delete group.


Work To Be Done

UI Modernization:
Enhance the UI with modern styles and custom icons.

Recurring Task Management:
Build dedicated UI for managing recurring tasks.

Expired Tasks:
handling expired tasks

User Notifications:
send notifications and reminders

Password verification: 
need to retype password 

Password Visibility:
Add option to see password when typing it in

Sign in with google:
Add option to sign in with google

Add group details to redux store and create groupSlice for better state management

Add more content to landing page

store the api url as well when backend hosting is finalised, instead of hard coding the url everywhere

can reduce reduntant api calls in some areas by finding better solution - priority low after all features complete

Expense Tracking:
Develop UI for adding and splitting expenses.
Display charts for expense summaries.