
# My Acad Roadmap

# https://my-acad-roadmap.herokuapp.com/

# Introduction and Functionality
According to National Center for Education Statistics, some 20 million students attend American colleges and universities. Educational counselors and advisors in secondary and higher education institutions advise millions of students the classes they have take every semester. If students and educational institutions know in advance the courses that students are supposed to take every semester then, the students know to course to take every semester and the institions know how many students will take each course every semester. This benefits both the students and institutions to plan and allocate resources accurately. My Acad Roadmap, short for My Academic Roadmap, helps students to plan their program of study for the entire duration of the study.

## Features
In this app, My Acad Road, users will be able to:
(1) Register for the app
(2) Select a group of courses to select courses from
(3) Select one or more courses that they want to take in the selected semester
(4) Save the courses they selected
(5) See their academic plan for all semesters
(6) Delete a course from any semester
(7) See their profile (username, full name, and photo)

## How to use the app?

### Landing Page
The landing page contains short information about the app, a space to log in, and an option to register if you are a new user of the app. 

<img width="483" alt="landing page 1" src="https://user-images.githubusercontent.com/34139675/41820311-db70288c-779d-11e8-83bf-4243277db157.png">

You can also click 'Features...' and it will list some features of the app. You click it again to collapse the display.

<img width="479" alt="landing page 2" src="https://user-images.githubusercontent.com/34139675/41820334-48d3fa70-779e-11e8-9d7f-7f24607c8fbc.png">

If you have already registered for the app, enter your user name and password. Note that the password encrypted so using modern encryption techniques so your password is less valunarable hacking. If you entered wrong user name or password, a warning message in red color will be displayed. 

<img width="465" alt="login page" src="https://user-images.githubusercontent.com/34139675/41821219-4d0ff668-77ab-11e8-8bf2-dc2b1e9118b1.png">


If this is your first time using the app, then click the 'Register' button and it will take you to the registration page. In the registration page, you will be able to enter your first name, last name, choose your academic program, username, 10 character password and confirm your password. Once you click 'Register' button, it will take you to a dashboard page. You can also go back to 'Log in' page if you realized that you have already registered for the app.

<img width="453" alt="registration page" src="https://user-images.githubusercontent.com/34139675/41820504-e1d675f2-77a0-11e8-945c-81068542937c.png">

If you register and login successfully, then, you will see the main page with a navigation bar and the default page is Dashboard. 

## Main Page
From this page, you will be able to navigate to several pages. 

<img width="461" alt="main page" src="https://user-images.githubusercontent.com/34139675/41823028-fdaf86bc-77c6-11e8-8089-16a5b2c74b2c.png">

<img width="461" alt="main page" src="https://user-images.githubusercontent.com/34139675/41823028-fdaf86bc-77c6-11e8-8089-16a5b2c74b2c.png">


## Dashboard Page
It displays all of the courses planned for each semester and an option to delete a course from the plan if you changed your mind. If you decided to delete a course, select a semester, a course and click the 'Delete' button. The course will be deleted and the new academic plan will be reloaded.

<img width="457" alt="dashboard page" src="https://user-images.githubusercontent.com/34139675/41823076-8c795198-77c7-11e8-873a-607e81f8f03f.png">

## Plan my program Page
In the 'Plan my Program' page, you will be able to select courses from any group, select a semester and enter a year, and select the courses you want to take for the selected semester. Click the 'Save' and it will take you to the Dashboard page. Note that, you can't enter a year before you select a semester and you can't select courses before you selected a semester. Moreover, you will not be able to change semester and year if you have selected at least one course.

<img width="453" alt="plan my program page 1" src="https://user-images.githubusercontent.com/34139675/41823153-035c2064-77c9-11e8-8088-cac0c504df57.png">

<img width="451" alt="plan my program page 2" src="https://user-images.githubusercontent.com/34139675/41823166-55afca6e-77c9-11e8-9697-1e811ea14252.png">

## Profile Page
The profile page displays your username, full name, and photo. At this time, the photo displayed will be the programmers/developer's picture. But for the future, more features can be added the possibility of uploading a user's photo during registration.

<img width="449" alt="profile page" src="https://user-images.githubusercontent.com/34139675/41823218-6dcca544-77ca-11e8-8c26-cbd8df797c21.png">

## Log out 
You can also click the 'Log out' link to exist from the app.

# Technologies Used:
HTML, CSS, Responsive Design, JAVASCRIPT, jQuery, AJAX, node.js, Implement REST API, mocha, heroku, mLab, mongoose, express, testing, modulirzation, router, chai, http-chai, heroku, TravisCI, React, and Redux. 

# Future work
More features can be added to the app. For example, photo uploading feature can be added to the up during registration or after login. In addition to this, the dashboard can be modified to show the total credit hours registered for each semester and total credit hours planned. 

# Note
1. The app may not work in Internet Explorer 11 because of some modern techniques used in developing the app.
2. The app was forced to refresh the 'Plan my Program' page in order to reload course catalog data. The actions and reducers would have been designed differently to avoid such forced refresh of a page.






















