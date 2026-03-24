#  Project Tracker UI

A fully functional multi-view project management frontend built using React + TypeScript.  
The application supports Kanban, List, and Timeline views over a shared dataset with custom drag-and-drop, virtual scrolling, filtering, and simulated collaboration.

---

##  Live Demo
https://project-tracker-ui-murex.vercel.app

##  Repository
https://github.com/swati02001/project-tracker-ui

---

##  Setup Instructions

```bash
npm install
npm run dev
```

##  Tech Stack

- React  
- TypeScript  
- Zustand (for state management)  
- Tailwind CSS  

---

##  State Management Decision

I used Zustand to manage the state because this application has multiple views (Kanban, List, and Timeline) that all depend on the same task data.

Using Zustand made it easy to keep everything in sync without passing props everywhere. Whenever a task is updated (like drag-and-drop or status change), the update reflects instantly across all views.

---

##  Virtual Scrolling Implementation

The List view uses a custom virtual scrolling approach to handle large data efficiently.

Instead of rendering all tasks at once, I only render the tasks that are visible on the screen along with a small buffer. This keeps the UI fast and smooth even with 500+ tasks.

### Benefits

- Smooth scrolling experience  
- No performance lag  
- Efficient DOM rendering  

---

##  Drag-and-Drop Approach

The drag-and-drop feature in the Kanban board is built using native browser drag events (no external libraries).

- Each card passes its `taskId` when dragging starts  
- Columns act as drop zones  
- When dropped, the task status is updated in the store  
- The UI updates instantly across all views  

This approach helped me understand how drag-and-drop works internally.

---

##  Features

- Kanban board with 4 columns  
- List view with sorting (title, priority, due date)  
- Timeline (Gantt-style) view  
- Custom drag-and-drop (no libraries used)  
- Virtual scrolling for better performance  
- Filters (status, priority, assignee, date range)  
- URL-based filter state  
- Simulated collaboration indicators  
- Inline status update in list view  
- Random task generator (500 tasks)  
- Proper empty states  

---

##  Performance Considerations

- Virtual scrolling reduces unnecessary DOM rendering  
- `useMemo` is used to avoid unnecessary re-renders  
- Zustand keeps state updates lightweight  
- Filtering is optimized across all views  

---

##  Future Improvements

- Improve drag-and-drop placeholder behavior  
- Add smooth animations for better UX  
- Support touch devices  
- Improve TypeScript typing  

---

##  Requirements Covered

- Multiple views with shared data  
- Custom drag-and-drop (no libraries)  
- Virtual scrolling (no libraries)  
- Timeline/Gantt view  
- Filters with URL sync  
- Collaboration indicators  
- Edge case handling  
- Large dataset support (500+ tasks)  

---

##  Author

Swati Verma  
Frontend Developer




