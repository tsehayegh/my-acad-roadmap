
# My Acad Roadmap

# https://my-acad-roadmap.herokuapp.com/
	You can use the follow credentials to demonstrate the app:
	username: test
	password: asdfghjklq

# Introduction and Functionality
According to National Center for Education Statistics, some 20 million students attend American colleges and universities. Educational counselors and advisors in secondary and higher education institutions advise millions of students the classes they have take every semester. If students and educational institutions know in advance the courses that students are supposed to take every semester then, the students know the course they are supposed take every semester and the institions also know how many students will take each course every semester. This benefits both the students and institutions to plan and allocate resources accurately. My Acad Roadmap, short for My Academic Roadmap, helps students to plan their program of study for the entire duration of any acaddemic program.

## Features
In this app, My Acad Road, users will be able to:
(1) Register for the app
(2) Select a group of courses to select courses from
(3) Select one or more courses that they want to take in the selected semester and year
(4) Save the courses they selected
(5) See their academic plan for all semesters
(6) Delete a course from any semester
(7) See their profile (username, full name, and photo)

# How to use the app?
The screen shots with their descriptions will guide you on how to use the app.

### Landing Page
The landing page contains short information about the app, a space to log in, and an option to register if you are a new user of the app. 

<img width="411" alt="Landing page" src="https://user-images.githubusercontent.com/34139675/42606349-183f9170-854b-11e8-90ef-9d684515a162.png">

If you have already registered for the app, enter your user name and password. Note that the password is encrypted using modern encryption techniques so your password is less valunarable to hacking. If you entered wrong user name or password, a warning message in red color will be displayed. 

<img width="411" alt="registration page" src="https://user-images.githubusercontent.com/34139675/42606751-427ba0d0-854d-11e8-8078-70a541bafa79.png">

If this is your first time using the app, then click the 'Register' link and it will take you to the registration page. In the registration page, you will be able to enter your first name, last name, choose your academic program, username, and ten characters password. Once you click the 'Register' button, it will take you to a dashboard page. You can also go back to the 'Log in' page if you realized that you have already registered for the app.

If you register and login successfully, then, you will see the main page with a navigation bar and the default page is your 'Dashboard'. 

## Main Page
From this page, you will be able to navigate to several pages. 

<img width="411" alt="Main page" src="https://user-images.githubusercontent.com/34139675/42607021-bcc7b756-854e-11e8-8100-bfb7ded40d67.png">

# Home Page
The name of the app, My Acad Roadmap,  with the university icon is also clickable and it will take you to the home page. 

<img width="411" alt="Home Screen" src="https://user-images.githubusercontent.com/34139675/42608133-65832538-8554-11e8-88d2-da6b0bcecfa1.png">

## Dashboard Page
It displays all of the courses planned for each semester and an option to delete a course from the plan if you changed your mind. If you decided to delete a course, select a semester, a course and click the 'X' icon and confirm the deletion. The course will be deleted and the new academic plan will be reloaded from the server.

<img width="411" alt="Dashboard page" src="https://user-images.githubusercontent.com/34139675/42607092-21ee34c0-854f-11e8-8969-70fafd43b7ea.png">

## Plan my program Page
In the 'Plan my Program' page, you will be able to select courses from one of the group of courses, select a semester and enter a year, and select the courses you want to take for the selected semester and year. Click the 'Save' button and it will take you to the Dashboard page. Note that, you can't enter a year before you select a semester and you can't select courses before you selected a semester. Moreover, you will not be able to change semester and year if you have selected at least one course. You will see error messages if the course is already selected or exceeds maximum selection per group. 

<img width="453" alt="plan my program page 1" src="https://user-images.githubusercontent.com/34139675/42607651-0585d754-8552-11e8-914b-6f4e1473d704.png">

<img width="453" alt="plan my program page 2" src="https://user-images.githubusercontent.com/34139675/42607712-4f807c92-8552-11e8-887c-ee373112bd60.png">

<img width="453" alt="plan my program page 3" src="https://user-images.githubusercontent.com/34139675/42607763-8be515da-8552-11e8-86b7-406c536d9cbb.png">


## Profile Page
The profile page displays your username, full name, and photo. At this time, the photo displayed will be the programmer's/developer's picture only. But for the future, more features can be added the possibility of uploading a user's photo during registration.

<img width="453" alt="Profile" src="https://user-images.githubusercontent.com/34139675/42607985-a5e73390-8553-11e8-8b07-2fa9f33c138a.png">

## Log out 
You can also click the 'Log out' link to exist from the app.

# Documentation of API.
	This api, https://my-acad-roadmap.herokuapp.com/api, provides access to course catalog and academic plans
	# Overview
	A user should register for the app to access the course catalog and plan for academic programs.
	# Authentication
	A user can register for the app and use the created username and password to access the API
	# Error Codes
	A user should enter valid input values during registration, no known error at this time.
	# Rate limit
	No limit.
	
	GET
	https://my-acad-roadmap.herokuapp.com/api/catalog
	GET end point: pulls all course catalogs
	
	GET
	https://my-acad-roadmap.herokuapp.com/api/catalog/:programcode
	GET end point: pulls course catalog for specific program code
	
	GET
	https://my-acad-roadmap.herokuapp.com/api/dashboard
	GET end point: pulls all academic plans
	
	GET
	https://my-acad-roadmap.herokuapp.com/api/dashboard/:id
	GET end point: pulls academic plans for a given record id
	
	POST
	https://my-acad-roadmap.herokuapp.com/api/acadplan
	POST end point: adds academic plans to the plans collection
	
	PUT
	https://my-acad-roadmap.herokuapp.com/api/acadplan/:id
	PUT end point: updates changes to an academic plan
	
	POST
	https://my-acad-roadmap.herokuapp.com/api/auth/login
	POST end point: user provides username and password to login - authentication
	
	POST
	https://my-acad-roadmap.herokuapp.com/api/auth/refresh
	POST end point: the user exchanges a valid JWT for new one - authentication
	
	POST
	https://my-acad-roadmap.herokuapp.com/api/users
	POST end point: register a new user
	
	GET
	https://my-acad-roadmap.herokuapp.com/api/user
	GET end point: pulls a user
	
# Technologies Used:
HTML, CSS, Responsive Design, JAVASCRIPT, jQuery, AJAX, node.js, Implement REST API, mocha, heroku, mLab, mongoose, express, testing, modulirzation, router, chai, http-chai, heroku, TravisCI, React, and Redux. 

# Future work
More features can be added to the app. For example, photo uploading feature can be added to the up during registration or after login. In addition to this, the dashboard can be modified to show the total credit hours registered for each semester and total credit hours planned. Password or username recovery option can also be added.

# Note
1. The app may not work in Internet Explorer 11 because of some modern techniques used in developing the app.
2. The app was forced to refresh the 'Plan my Program' page in order to reload course catalog data. The actions and reducers would have been designed differently to avoid such forced refresh of a page.
3. The user registration and authentication modules were written by Thinkful. I customized it to fit with my app. Thank you Thinkful for this.
























