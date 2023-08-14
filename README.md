# Promodo Timer

## ⌛ Description

Promodo Timer is a productivity web application that helps users manage their time effectively by utilizing the well-known Pomodoro Technique. Francesco Cirillo developed this technique in the late 1980s as a time management tool. It is a simple yet efficient method of improving focus, productivity, and time management by dividing work into 25-minute intervals interrupted by brief breaks.

Users can configure adjustable work and break periods to suit their preferences and work patterns with this web application. A notification sound will indicate the time to take a break when the work interval expires, and vice versa. Users can also keep a to-do list within the app to help them stay organized and productive.

## 📝 Features

- Customizable work and break intervals to cater to individual preferences.
- User-friendly interface with visual cues for work and break periods.
- A built-in to-do list feature to keep track of tasks.
- Sound notifications to alert users when it's time to switch between work and break modes.
- Easy-to-use controls for starting, pausing, and resetting the timer.
- Mobile-responsive design for seamless usage on various devices.

## 💻 Technologies Used

- HTML: The markup language used for structuring the web page.
- CSS: Styling the application for an aesthetically pleasing user experience.
- JavaScript: Adding interactivity and functionality to the web application.
- [Howler.js](https://howlerjs.com/): A JavaScript library for audio playback and sound management across all platforms.

## 💁‍♂️ How to Use

1. Set the desired work and break intervals using the "Set times" option in the setting's menu.
2. Click the "Start" button to begin the timer countdown for the work interval.
3. When the work interval ends, a notification sound will play, indicating the start of the break interval.
4. Click the "Pause" button to temporarily pause the timer if needed.
5. To reset the timer, click the "Reset" button.
6. The to-do list feature allows users to enter tasks and keep track of their progress.
7. Click the "To-do list" button to access and manage your tasks.

## 🧩 Problems and Solutions

During the development of this project, several challenges were encountered, including:

1. **Implementing Sound Notifications**: Implementing Sound Notifications: The "Howler.js" library  was used in this project to address the issue of notification sounds not playing on some devices, primarily the Safari browser for iPhone and MacBook users. By include this library, customers who have their device's ringer on or silent mode turned off can now get audio alerts in between each period. With the help of this technology, audio playback is guaranteed to be straightforward, giving users the ability to organise their work and break times efficiently.

2. **Handling Local Storage**: It was challenging to store and retrieve data from the browser's local storage when the to-do list function and the user's timer settings were implemented. Users can save tasks and timer preferences even when the browser is closed thanks to JavaScript's use of the local storage API. Users may restart work sessions and keep their to-do list across sessions thanks to this personalized experience.

3. **Responsive Design for Mobile Devices**: Ensuring that the web application's interface is responsive and user-friendly on various screen sizes and devices required careful design considerations. The application needed to adapt its layout and components to provide a convenient experience for users on both desktop and mobile devices.


## 👀 Preview

![Promodo Timer Preview](https://github.com/Fordinh4/Promodo-Timer/assets/132872972/d80e70eb-f04c-422a-84a7-6d78d37846e1)
![image](https://github.com/Fordinh4/Promodo-Timer/assets/132872972/c5eb955e-8fe6-4340-b803-7069d57ca796)
![image](https://github.com/Fordinh4/Promodo-Timer/assets/132872972/78de867f-581f-454d-98a5-7abf9ed4e7ac)


## 🎯 Future Updates

The Promodo Timer web application has great potential for improvement and enhancement. Here are some exciting features and updates planned for future releases:

1. **Auto Start Round Toggle**: Implementing an auto-start round toggle will allow users to automatically begin/pause the timer without the need to click the "Start"/"Pause" button manually. This will provide a more efficient user experience, especially for users who follow strict work and break schedules.

2. **Long Break Interval**: Introducing a customizable long break interval will give users more control over their work sessions. Currently, the application follows a fixed pattern of short breaks after a certain number of work sessions. Allowing users to define the interval between long breaks will cater to individual preferences and work habits.

3. **Notification Badge**: Adding a notification badge will enhance the application's accessibility and user engagement. The badge will display the number of pending tasks in the to-do list, even when the application is not actively in use. This visual cue will serve as a reminder for users to stay on top of their tasks and maintain productivity.

4. **Drag and Drop To-Do List**: Implementing the ability to move items within the to-do list will offer users greater flexibility in organizing their tasks. Users can reorder tasks by dragging and dropping them, making task management more intuitive and efficient.

5. **Persistent Strikethrough**: Saving the strikethrough state of completed tasks in the local storage will ensure that the completed tasks remain marked even after the application is closed and reopened. This improvement will provide a consistent user experience when managing their to-do list.

6. **Color Palettes**: Adding color palettes will allow users to personalize the application's visual appearance according to their preferences. Offering a selection of color themes will enhance user satisfaction and engagement with the application.

7. **Chrome Extension**: Expanding the Promodo Timer as a Chrome extension will enable users to access the timer and to-do list functionality directly from their browser. This extension will provide a quick and convenient way for users to manage their time and tasks without navigating to a separate web page.

Stay tuned for these exciting enhancements in future releases!
