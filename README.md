# 🚀 Project Tracker UI

A fully functional multi-view project management frontend built using React + TypeScript.  
The application supports Kanban, List, and Timeline views over a shared dataset with custom drag-and-drop, virtual scrolling, filtering, and simulated collaboration.

---

## 🔗 Live Demo
https://project-tracker-ui-murex.vercel.app

## 📂 Repository
https://github.com/swati02001/project-tracker-ui

---

## ⚙️ Setup Instructions
```bash
npm install
npm run dev



## Tech Stack

- React
- TypeScript
- Zustand (State Management)
- Tailwind CSS

**State Management Decision**

- I chose Zustand for state management because the application requires a single shared dataset across multiple views (Kanban, List, Timeline), along with filters, drag-and-drop updates, and collaboration indicators.
- Zustand provides a lightweight global store with minimal boilerplate, making it easier to manage shared state without prop drilling. It keeps updates predictable and ensures all views stay synchronized in real-time when tasks are modified.

**Virtual Scrolling Implementation**

The List view uses a custom-built virtual scrolling system without external libraries.
Instead of rendering all tasks, the implementation calculates:
- Current scroll position
- Visible row range
- Buffer rows above and below
Only visible rows are rendered, while a spacer container maintains the full scroll height. This ensures:
- Smooth scrolling
- No UI lag
- Efficient rendering even with 500+ tasks

**Drag-and-Drop Approach**

Drag-and-drop in the Kanban view is implemented using native browser drag events.
- Each card sets its taskId using dataTransfer on drag start
- Columns act as drop zones using onDragOver and onDrop
- On drop, the task status is updated in Zustand
- The UI re-renders instantly with the updated state
No external libraries were used, ensuring full control over the interaction.

**Features**

- Kanban Board with 4 columns
- List View with sorting (Title, Priority, Due Date)
- Timeline (Gantt-style) with current date indicator
- Custom drag-and-drop (no libraries)
- Virtual scrolling for performance (500+ tasks)
- Filters (status, priority, assignee, date range)
- URL-synced filters & view state
- Simulated real-time collaboration indicators
- Inline status update in List view
- Seed data generator (500 tasks)
- Empty states for filtered/no-result scenarios

**Folder Structure**

src/
 ├── components/
 │   ├── Kanban/
 │   ├── List/
 │   ├── Timeline/
 │   └── Common/
 ├── pages/
 ├── store/
 ├── hooks/
 ├── utils/

**Performance Considerations**

- Virtual scrolling reduces DOM size
- useMemo prevents unnecessary re-renders
- Zustand ensures lightweight state updates
- Efficient filtering logic across views

**Future Improvements**

- Add drag placeholder to fully eliminate layout shift
- Add smooth snap-back animation for invalid drops
- Improve mobile responsiveness
- Add pointer/touch support for drag-and-drop
- Strengthen TypeScript typing across components

**Requirements Covered**

- Multi-view shared dataset
- Custom drag-and-drop (no libraries)
- Virtual scrolling (no libraries)
- Timeline/Gantt view
- Filters with URL sync
- Collaboration indicators
- Empty states & edge cases
- 500+ task generator
- Performance optimization

**Author**

Swati Verma
Frontend Developer
