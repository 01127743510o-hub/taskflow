/**
 * TASKFLOW — Core Application Logic (Professional Version)
 * NEXORA Design System
 */

(function () {
    'use strict';

    /**
     * UI References
     */
    const elements = {
        sidebar: document.getElementById('sidebar'),
        overlay: document.getElementById('sidebar-overlay'),
        menuToggle: document.getElementById('menu-toggle'),
        closeSidebar: document.getElementById('close-sidebar'),
        appContainer: document.querySelector('.app-container'),
        languageToggle: document.getElementById('language-toggle'),
        currentPageTitle: document.getElementById('current-page-title'),
        globalSearch: document.getElementById('global-search'),
        settingsLangToggle: document.getElementById('settings-lang-toggle'),
        exportData: document.getElementById('export-data'),
        importData: document.getElementById('import-data'),
        importFile: document.getElementById('import-file'),
        clearData: document.getElementById('clear-data'),
        taskModal: document.getElementById('task-modal'),
        taskForm: document.getElementById('task-form'),
        taskId: document.getElementById('task-id'),
        taskTitle: document.getElementById('task-title'),
        taskDescription: document.getElementById('task-description'),
        taskDate: document.getElementById('task-date'),
        taskPriority: document.getElementById('task-priority'),
        taskCategory: document.getElementById('task-category'),
        saveTaskButton: document.getElementById('save-task-button'),
        modalTitle: document.getElementById('modal-title'),
        toastContainer: document.getElementById('toast-container'),
        dashboardTaskList: document.getElementById('dashboard-task-list'),
        dashboardEmpty: document.getElementById('dashboard-empty'),
        fullTaskList: document.getElementById('full-task-list'),
        statTotal: document.getElementById('stat-total'),
        statCompleted: document.getElementById('stat-completed'),
        statPending: document.getElementById('stat-pending'),
        statProductivity: document.getElementById('stat-productivity'),
        ringPct: document.getElementById('ring-pct'),
        summaryToday: document.getElementById('summary-today'),
        summaryOverdue: document.getElementById('summary-overdue'),
        sidebarTaskCount: document.getElementById('sidebar-task-count'),
        dashboardRing: document.getElementById('dashboard-ring'),
        calendarGrid: document.getElementById('calendar-grid'),
        calendarMonthTitle: document.getElementById('calendar-month-title'),
        agendaList: document.getElementById('agenda-list'),
        calPrev: document.getElementById('cal-prev'),
        calNext: document.getElementById('cal-next'),
        calToday: document.getElementById('cal-today'),
        priorityFilter: document.getElementById('priority-filter'),
        sortFilter: document.getElementById('sort-filter'),
    };

    /**
     * State Management
     */
    let state = {
        language: localStorage.getItem('taskflow-language') || 'ar',
        sidebarOpen: false,
        tasks: [],
        currentView: 'dashboard',
        currentTaskFilter: 'all',
        currentPriorityFilter: 'all',
        currentSortFilter: 'date',
        editingTaskId: null,
        calendarDate: new Date(),
        selectedCalendarDate: null,
    };

    /**
     * Translations
     */
    const translations = {
        ar: {
            workspace: 'مساحة العمل',
            dashboard: 'لوحة التحكم',
            myTasks: 'مهامي',
            calendar: 'التقويم',
            analytics: 'التحليلات',
            taskManagement: 'التصنيفات',
            today: 'اليوم',
            upcoming: 'القادمة',
            completed: 'المكتملة',
            stayProductive: 'كن منتجاً',
            upgradeDescription: 'نظم يومك وحقق أهدافك بذكاء.',
            companyTagline: 'BUILD • INNOVATE • TRANSFORM',
            settings: 'الإعدادات',
            welcome: 'مرحباً بك مجدداً',
            welcomeDescription: 'إليك نظرة سريعة على إنتاجيتك اليوم.',
            createTask: 'إضافة مهمة',
            totalTasks: 'إجمالي المهام',
            completedTasks: 'المكتملة',
            pendingTasks: 'قيد التنفيذ',
            productivity: 'معدل الإنجاز',
            recentTasks: 'المهام الأخيرة',
            nothingHere: 'لا توجد مهام حالياً',
            dailyProgress: 'تقدم اليوم',
            dueToday: 'مستحقة اليوم',
            overdue: 'متأخرة',
            taskTitle: 'عنوان المهمة',
            description: 'الوصف',
            dueDate: 'التاريخ',
            priority: 'الأولوية',
            category: 'التصنيف',
            cancel: 'إلغاء',
            saveTask: 'حفظ المهمة',
            editTask: 'تعديل المهمة',
            low: 'منخفضة',
            medium: 'متوسطة',
            high: 'عالية',
            all: 'الكل',
            allPriorities: 'كل الأولويات',
            active: 'النشطة',
            sortByDate: 'حسب التاريخ',
            sortByPriority: 'حسب الأولوية',
            alphabetical: 'أبجدياً',
            work: 'عمل',
            personal: 'شخصي',
            study: 'دراسة',
            other: 'أخرى',
            appearance: 'المظهر واللغة',
            language: 'لغة التطبيق',
            dataManagement: 'إدارة البيانات',
            exportData: 'تصدير',
            importData: 'استيراد',
            dangerZone: 'منطقة الخطر',
            clearAllData: 'حذف جميع البيانات',
            search: 'بحث...',
            taskSaved: 'تم حفظ المهمة بنجاح',
            taskDeleted: 'تم حذف المهمة',
            dataExported: 'تم تصدير البيانات',
            dataImported: 'تم استيراد البيانات',
            dataCleared: 'تم حذف جميع البيانات',
            confirmClear: 'هل أنت متأكد من حذف جميع المهام؟ لا يمكن التراجع.',
            noTasks: 'لا توجد مهام',
            todayLabel: 'اليوم',
            completionTrend: 'اتجاه الإنجاز',
            priorityDistribution: 'توزيع الأولويات',
            categoryBreakdown: 'تفصيل التصنيفات',
            weeklyStats: 'إحصائيات أسبوعية',
        },
        en: {
            workspace: 'Workspace',
            dashboard: 'Dashboard',
            myTasks: 'My Tasks',
            calendar: 'Calendar',
            analytics: 'Analytics',
            taskManagement: 'Categories',
            today: 'Today',
            upcoming: 'Upcoming',
            completed: 'Completed',
            stayProductive: 'Stay Productive',
            upgradeDescription: 'Organize your day and achieve goals smartly.',
            companyTagline: 'BUILD • INNOVATE • TRANSFORM',
            settings: 'Settings',
            welcome: 'Welcome Back',
            welcomeDescription: 'Here\'s a quick overview of your productivity today.',
            createTask: 'Create Task',
            totalTasks: 'Total Tasks',
            completedTasks: 'Completed',
            pendingTasks: 'In Progress',
            productivity: 'Completion Rate',
            recentTasks: 'Recent Tasks',
            nothingHere: 'No tasks yet',
            dailyProgress: 'Daily Progress',
            dueToday: 'Due Today',
            overdue: 'Overdue',
            taskTitle: 'Task Title',
            description: 'Description',
            dueDate: 'Due Date',
            priority: 'Priority',
            category: 'Category',
            cancel: 'Cancel',
            saveTask: 'Save Task',
            editTask: 'Edit Task',
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            all: 'All',
            allPriorities: 'All Priorities',
            active: 'Active',
            sortByDate: 'By Date',
            sortByPriority: 'By Priority',
            alphabetical: 'Alphabetical',
            work: 'Work',
            personal: 'Personal',
            study: 'Study',
            other: 'Other',
            appearance: 'Appearance & Language',
            language: 'App Language',
            dataManagement: 'Data Management',
            exportData: 'Export',
            importData: 'Import',
            dangerZone: 'Danger Zone',
            clearAllData: 'Clear All Data',
            search: 'Search...',
            taskSaved: 'Task saved successfully',
            taskDeleted: 'Task deleted',
            dataExported: 'Data exported',
            dataImported: 'Data imported',
            dataCleared: 'All data cleared',
            confirmClear: 'Are you sure you want to delete all tasks? This cannot be undone.',
            noTasks: 'No tasks',
            todayLabel: 'Today',
            completionTrend: 'Completion Trend',
            priorityDistribution: 'Priority Distribution',
            categoryBreakdown: 'Category Breakdown',
            weeklyStats: 'Weekly Stats',
        }
    };

    /**
     * Helper Functions
     */
    const t = (key) => translations[state.language]?.[key] || key;

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function formatDate(date, locale = state.language) {
        return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }

    function formatDateShort(date, locale = state.language) {
        return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
            month: 'short', day: 'numeric'
        });
    }

    function isToday(date) {
        const today = new Date();
        const d = new Date(date);
        // Compare date parts in local timezone, not UTC
        return d.getFullYear() === today.getFullYear() &&
               d.getMonth() === today.getMonth() &&
               d.getDate() === today.getDate();
    }

    function isOverdue(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(date) < today;
    }

    function getPriorityColor(priority) {
        const colors = {
            high: 'var(--priority-high)',
            medium: 'var(--priority-medium)',
            low: 'var(--priority-low)'
        };
        return colors[priority] || colors.medium;
    }

    function getCategoryIcon(category) {
        const icons = {
            work: 'briefcase',
            personal: 'user',
            study: 'book-open',
            other: 'more-horizontal'
        };
        return icons[category] || 'more-horizontal';
    }

    /**
     * Data Persistence
     */
    function loadTasks() {
        try {
            const stored = localStorage.getItem('taskflow-tasks');
            state.tasks = stored ? JSON.parse(stored) : [];
        } catch (e) {
            state.tasks = [];
        }
    }

    function saveTasks() {
        localStorage.setItem('taskflow-tasks', JSON.stringify(state.tasks));
    }

    function exportData() {
        const data = {
            tasks: state.tasks,
            language: state.language,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast(t('dataExported'), 'success');
    }

    function importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.tasks && Array.isArray(data.tasks)) {
                    state.tasks = data.tasks;
                    saveTasks();
                    if (data.language) {
                        state.language = data.language;
                        localStorage.setItem('taskflow-language', state.language);
                    }
                    renderAll();
                    showToast(t('dataImported'), 'success');
                } else {
                    showToast('Invalid backup file', 'error');
                }
            } catch (err) {
                showToast('Failed to import: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    }

    function clearAllData() {
        if (confirm(t('confirmClear'))) {
            state.tasks = [];
            saveTasks();
            renderAll();
            showToast(t('dataCleared'), 'success');
        }
    }

    /**
     * Task Operations
     */
    function createTask(data) {
        const task = {
            id: generateId(),
            title: data.title,
            description: data.description || '',
            date: data.date,
            priority: data.priority || 'medium',
            category: data.category || 'work',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        state.tasks.unshift(task);
        saveTasks();
        return task;
    }

    function updateTask(id, data) {
        const index = state.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            state.tasks[index] = {
                ...state.tasks[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            saveTasks();
            return state.tasks[index];
        }
        return null;
    }

    function deleteTask(id) {
        state.tasks = state.tasks.filter(t => t.id !== id);
        saveTasks();
    }

    function toggleTaskComplete(id) {
        const task = state.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date().toISOString();
            saveTasks();
            return task;
        }
        return null;
    }

    /**
     * Task Filtering & Sorting
     */
    function getFilteredTasks() {
        let tasks = [...state.tasks];

        // View filter
        switch (state.currentView) {
            case 'today':
                tasks = tasks.filter(t => isToday(t.date));
                break;
            case 'upcoming':
                tasks = tasks.filter(t => !isToday(t.date) && !t.completed && new Date(t.date) >= new Date());
                break;
            case 'completed':
                tasks = tasks.filter(t => t.completed);
                break;
        }

        // Task filter (tabs in tasks view)
        switch (state.currentTaskFilter) {
            case 'active':
                tasks = tasks.filter(t => !t.completed);
                break;
            case 'completed':
                tasks = tasks.filter(t => t.completed);
                break;
        }

        // Priority filter
        if (state.currentPriorityFilter !== 'all') {
            tasks = tasks.filter(t => t.priority === state.currentPriorityFilter);
        }

        // Search filter
        const searchTerm = elements.globalSearch?.value.toLowerCase().trim();
        if (searchTerm) {
            tasks = tasks.filter(t =>
                t.title.toLowerCase().includes(searchTerm) ||
                t.description.toLowerCase().includes(searchTerm)
            );
        }

        // Sort
        tasks.sort((a, b) => {
            switch (state.currentSortFilter) {
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
                case 'alphabetical':
                    return a.title.localeCompare(b.title, state.language);
                case 'date':
                default:
                    return new Date(a.date) - new Date(b.date);
            }
        });

        return tasks;
    }

    /**
     * Statistics
     */
    function calculateStats() {
        const total = state.tasks.length;
        const completed = state.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;
        const dueToday = state.tasks.filter(t => !t.completed && isToday(t.date)).length;
        const overdue = state.tasks.filter(t => !t.completed && isOverdue(t.date)).length;

        return { total, completed, pending, productivity, dueToday, overdue };
    }

    /**
     * Rendering Functions
     */
    function renderTaskItem(task, compact = false) {
        const isOverdueTask = !task.completed && isOverdue(task.date);
        const priorityColor = getPriorityColor(task.priority);
        const categoryIcon = getCategoryIcon(task.category);

        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${isOverdueTask ? 'overdue' : ''}" data-task-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="${t(task.completed ? 'completed' : 'active')}">
                <div class="task-content">
                    <span class="task-title">${escapeHtml(task.title)}</span>
                    ${task.description ? `<span class="task-description">${escapeHtml(task.description)}</span>` : ''}
                    <div class="task-meta">
                        <span><i data-lucide="calendar"></i> ${formatDateShort(task.date)}</span>
                        <span class="priority-badge ${task.priority}" style="border-color: ${priorityColor}; color: ${priorityColor}; background: ${priorityColor}15;">
                            <i data-lucide="${categoryIcon}"></i> ${t(task.priority)}
                        </span>
                        <span><i data-lucide="tag"></i> ${t(task.category)}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-icon edit-task" aria-label="${t('editTask')}" data-task-id="${task.id}">
                        <i data-lucide="edit-2"></i>
                    </button>
                    <button class="btn-icon delete-task" aria-label="Delete" data-task-id="${task.id}">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function renderDashboardTasks() {
        const tasks = getFilteredTasks().slice(0, 5);
        if (tasks.length === 0) {
            elements.dashboardTaskList.innerHTML = '';
            elements.dashboardEmpty.classList.remove('hidden');
        } else {
            elements.dashboardTaskList.innerHTML = tasks.map(t => renderTaskItem(t, true)).join('');
            elements.dashboardEmpty.classList.add('hidden');
        }
        lucide.createIcons();
    }

    function renderFullTaskList() {
        const tasks = getFilteredTasks();
        if (tasks.length === 0) {
            elements.fullTaskList.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="clipboard-list"></i>
                    <p>${t('noTasks')}</p>
                </div>
            `;
        } else {
            elements.fullTaskList.innerHTML = tasks.map(t => renderTaskItem(t)).join('');
        }
        lucide.createIcons();
    }

    function renderStats() {
        const stats = calculateStats();
        elements.statTotal.textContent = stats.total;
        elements.statCompleted.textContent = stats.completed;
        elements.statPending.textContent = stats.pending;
        elements.statProductivity.textContent = stats.productivity + '%';
        elements.summaryToday.textContent = stats.dueToday;
        elements.summaryOverdue.textContent = stats.overdue;
        elements.sidebarTaskCount.textContent = stats.pending;

        // Progress ring
        const circumference = 2 * Math.PI * 50;
        const offset = circumference - (stats.productivity / 100) * circumference;
        const progressCircle = elements.dashboardRing.querySelectorAll('circle')[1];
        if (progressCircle) {
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
        elements.ringPct.textContent = stats.productivity + '%';
    }

    function renderCalendar() {
        const date = state.calendarDate;
        const year = date.getFullYear();
        const month = date.getMonth();

        const monthNames = state.language === 'ar'
            ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
            : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        elements.calendarMonthTitle.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const dayHeaders = state.language === 'ar'
            ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let html = dayHeaders.map(d => `<div class="calendar-day-header">${d}</div>`).join('');

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            html += `<div class="calendar-day other-month">${day}</div>`;
        }

        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const isTodayDay = currentDate.toDateString() === today.toDateString();
            const isSelected = state.selectedCalendarDate && currentDate.toDateString() === state.selectedCalendarDate.toDateString();
            const dayTasks = state.tasks.filter(t => new Date(t.date).toDateString() === currentDate.toDateString());
            const hasTasks = dayTasks.length > 0;

            let classes = 'calendar-day';
            if (isTodayDay) classes += ' today';
            if (isSelected) classes += ' selected';
            if (hasTasks) classes += ' has-tasks';

            html += `
                <div class="${classes}" data-date="${currentDate.toISOString().split('T')[0]}">
                    <span class="calendar-day-number">${day}</span>
                    ${hasTasks ? `<span class="evt-badge" style="background: var(--primary);"></span>` : ''}
                </div>
            `;
        }

        // Next month days
        const totalCells = firstDay + daysInMonth;
        const nextMonthDays = Math.ceil(totalCells / 7) * 7 - totalCells;
        for (let day = 1; day <= nextMonthDays; day++) {
            html += `<div class="calendar-day other-month">${day}</div>`;
        }

        elements.calendarGrid.innerHTML = html;
        renderAgenda();
        lucide.createIcons();
    }

    function renderAgenda() {
        const date = state.selectedCalendarDate || new Date();
        const dateStr = date.toISOString().split('T')[0];
        const dayTasks = state.tasks.filter(t => t.date === dateStr);

        if (dayTasks.length === 0) {
            elements.agendaList.innerHTML = `
                <div class="empty-state" style="padding: 24px;">
                    <i data-lucide="calendar"></i>
                    <p>${state.language === 'ar' ? 'لا توجد مهام في هذا اليوم' : 'No tasks for this day'}</p>
                </div>
            `;
        } else {
            elements.agendaList.innerHTML = dayTasks.map(t => renderTaskItem(t)).join('');
        }
        lucide.createIcons();
    }

    function renderAnalytics() {
        const completionChart = document.getElementById('completion-chart');
        const priorityChart = document.getElementById('priority-chart');
        const categoryChart = document.getElementById('category-chart');
        const weeklyStats = document.getElementById('weekly-stats');

        if (!completionChart) return;

        // Completion trend (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        const completionData = last7Days.map(date => {
            return state.tasks.filter(t => t.completed && t.updatedAt.startsWith(date)).length;
        });

        const maxCompletion = Math.max(...completionData, 1);

        completionChart.innerHTML = `
            <div class="chart-bars" style="display: flex; align-items: flex-end; justify-content: space-around; height: 150px; gap: 8px; padding: 16px 0;">
                ${completionData.map((val, i) => `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                        <div style="width: 100%; height: ${(val / maxCompletion) * 100}%; min-height: 4px; background: linear-gradient(180deg, var(--primary), #6366f1); border-radius: 4px 4px 0 0; transition: height 0.3s ease;"></div>
                        <span style="font-size: 10px; color: var(--text-muted);">${last7Days[i].split('-')[2]}/${last7Days[i].split('-')[1]}</span>
                        <span style="font-size: 11px; font-weight: 600; color: var(--text-primary);">${val}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Priority distribution
        const priorityCounts = { high: 0, medium: 0, low: 0 };
        state.tasks.forEach(task => {
            if (priorityCounts.hasOwnProperty(task.priority)) priorityCounts[task.priority]++;
        });

        const totalPriority = state.tasks.length || 1;
        priorityChart.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px 0;">
                ${Object.entries(priorityCounts).map(([priority, count]) => `
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span style="display: flex; align-items: center; gap: 8px;">
                                <span class="priority-badge ${priority}">${t(priority)}</span>
                                <span>${count}</span>
                            </span>
                            <span style="color: var(--text-muted);">${Math.round((count / totalPriority) * 100)}%</span>
                        </div>
                        <div style="height: 8px; background: var(--bg-accent); border-radius: 4px; overflow: hidden;">
                            <div style="width: ${(count / totalPriority) * 100}%; height: 100%; background: ${getPriorityColor(priority)}; border-radius: 4px; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Category breakdown
        const categories = ['work', 'personal', 'study', 'other'];
        const categoryCounts = {};
        categories.forEach(c => categoryCounts[c] = 0);
        state.tasks.forEach(task => {
            if (categoryCounts.hasOwnProperty(task.category)) categoryCounts[task.category]++;
        });

        const totalCategory = state.tasks.length || 1;
        categoryChart.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px 0;">
                ${categories.map(cat => `
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span style="display: flex; align-items: center; gap: 8px;">
                                <i data-lucide="${getCategoryIcon(cat)}" style="width: 14px; height: 14px; color: var(--text-muted);"></i>
                                <span>${t(cat)}</span>
                            </span>
                            <span style="color: var(--text-muted);">${categoryCounts[cat]} (${Math.round((categoryCounts[cat] / totalCategory) * 100)}%)</span>
                        </div>
                        <div style="height: 8px; background: var(--bg-accent); border-radius: 4px; overflow: hidden;">
                            <div style="width: ${(categoryCounts[cat] / totalCategory) * 100}%; height: 100%; background: var(--primary); border-radius: 4px; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Weekly stats
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekTasks = state.tasks.filter(t => {
            const taskDate = new Date(t.date);
            return taskDate >= weekStart && taskDate <= weekEnd;
        });

        const weekCompleted = weekTasks.filter(t => t.completed).length;
        const weekTotal = weekTasks.length;
        const weekProductivity = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0;

        weeklyStats.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 16px 0;">
                <div class="stat-mini">
                    <span style="color: var(--text-muted); font-size: 12px;">${t('totalTasks')}</span>
                    <strong style="font-size: 24px; color: var(--text-primary);">${weekTotal}</strong>
                </div>
                <div class="stat-mini">
                    <span style="color: var(--text-muted); font-size: 12px;">${t('completedTasks')}</span>
                    <strong style="font-size: 24px; color: var(--success);">${weekCompleted}</strong>
                </div>
                <div class="stat-mini">
                    <span style="color: var(--text-muted); font-size: 12px;">${t('productivity')}</span>
                    <strong style="font-size: 24px; color: var(--primary);">${weekProductivity}%</strong>
                </div>
                <div class="stat-mini">
                    <span style="color: var(--text-muted); font-size: 12px;">${t('pendingTasks')}</span>
                    <strong style="font-size: 24px; color: var(--warning);">${weekTotal - weekCompleted}</strong>
                </div>
            </div>
        `;

        lucide.createIcons();
    }

    function renderAll() {
        renderDashboardTasks();
        renderFullTaskList();
        renderStats();
        renderCalendar();
        renderAnalytics();
        updateActiveNav();
    }

    function updateActiveNav() {
        // Update sidebar nav
        document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === state.currentView);
        });
        document.querySelectorAll('.nav-item[data-filter]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === state.currentView);
        });

        // Update tabs
        document.querySelectorAll('.tab[data-task-filter]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.taskFilter === state.currentTaskFilter);
        });

        // Update page title
        const titles = {
            dashboard: t('dashboard'),
            tasks: t('myTasks'),
            calendar: t('calendar'),
            analytics: t('analytics'),
            settings: t('settings'),
            today: t('today'),
            upcoming: t('upcoming'),
            completed: t('completed')
        };
        elements.currentPageTitle.textContent = titles[state.currentView] || t('dashboard');
    }

    /**
     * View Navigation
     */
    function showView(view) {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

        // Check if it's a filter that should stay on tasks view
        if (['today', 'upcoming', 'completed'].includes(view)) {
            state.currentView = view; // KEEP the specific filter name!
            state.currentTaskFilter = view; // Tasks view needs to know which filter is applied
            document.getElementById('tasks-view').classList.add('active');
        } else {
            state.currentView = view;
            const targetView = document.getElementById(`${view}-view`);
            if (targetView) {
                targetView.classList.add('active');
            }
        }

        updateActiveNav();
        renderAll();
        // Only toggle sidebar on small screens (mobile/tablet)
        if (window.innerWidth <= 1024) {
            toggleSidebar(false);
        }
    }

    /**
     * Modal Handling
     */
    function openTaskModal(task = null) {
        state.editingTaskId = task?.id || null;

        if (task) {
            elements.modalTitle.textContent = t('editTask');
            elements.saveTaskButton.innerHTML = `<i data-lucide="check"></i> <span data-i18n="saveTask">${t('saveTask')}</span>`;
            elements.taskId.value = task.id;
            elements.taskTitle.value = task.title;
            elements.taskDescription.value = task.description || '';
            elements.taskDate.value = task.date;
            elements.taskPriority.value = task.priority;
            elements.taskCategory.value = task.category;
        } else {
            elements.modalTitle.textContent = t('createTask');
            elements.saveTaskButton.innerHTML = `<i data-lucide="check"></i> <span data-i18n="saveTask">${t('saveTask')}</span>`;
            elements.taskForm.reset();
            elements.taskId.value = '';
            // Set default date to today
            elements.taskDate.value = new Date().toISOString().split('T')[0];
        }

        elements.taskModal.classList.add('active');
        lucide.createIcons();
        elements.taskTitle.focus();
    }

    function closeTaskModal() {
        elements.taskModal.classList.remove('active');
        state.editingTaskId = null;
    }

    function handleTaskSubmit(e) {
        e.preventDefault();

        const data = {
            title: elements.taskTitle.value.trim(),
            description: elements.taskDescription.value.trim(),
            date: elements.taskDate.value,
            priority: elements.taskPriority.value,
            category: elements.taskCategory.value
        };

        if (!data.title) {
            showToast('Title is required', 'error');
            return;
        }

        if (state.editingTaskId) {
            updateTask(state.editingTaskId, data);
            showToast(t('taskSaved'), 'success');
        } else {
            createTask(data);
            showToast(t('taskSaved'), 'success');
        }

        closeTaskModal();
        renderAll();
    }

    /**
     * Event Handlers
     */
    function handleTaskAction(e) {
        const taskId = e.target.closest('[data-task-id]')?.dataset.taskId;
        if (!taskId) return;

        if (e.target.closest('.task-checkbox')) {
            toggleTaskComplete(taskId);
            renderAll();
        } else if (e.target.closest('.edit-task')) {
            const task = state.tasks.find(t => t.id === taskId);
            if (task) openTaskModal(task);
        } else if (e.target.closest('.delete-task')) {
            deleteTask(taskId);
            showToast(t('taskDeleted'), 'success');
            renderAll();
        }
    }

    function handleCalendarDayClick(e) {
        const dayEl = e.target.closest('.calendar-day');
        if (!dayEl || dayEl.classList.contains('other-month')) return;

        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        dayEl.classList.add('selected');

        state.selectedCalendarDate = new Date(dayEl.dataset.date);
        renderAgenda();
    }

    function handleSearch(e) {
        renderAll();
    }

    function handlePriorityFilter(e) {
        state.currentPriorityFilter = e.target.value;
        renderFullTaskList();
    }

    function handleSortFilter(e) {
        state.currentSortFilter = e.target.value;
        renderFullTaskList();
    }

    function handleTabClick(e) {
        const tab = e.target.closest('.tab[data-task-filter]');
        if (tab) {
            state.currentTaskFilter = tab.dataset.taskFilter;
            renderFullTaskList();
            updateActiveNav();
        }
    }

    function handleNavClick(e) {
        const navItem = e.target.closest('.nav-item[data-view]');
        if (navItem) {
            showView(navItem.dataset.view);
        }

        const filterItem = e.target.closest('.nav-item[data-filter]');
        if (filterItem) {
            showView(filterItem.dataset.filter);
        }
    }

    function handleSettingsLangToggle() {
        state.language = state.language === 'ar' ? 'en' : 'ar';
        localStorage.setItem('taskflow-language', state.language);
        applyLanguage();
        renderAll();
    }

    function applyLanguage() {
        document.documentElement.lang = state.language;
        document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[state.language][key]) {
                el.textContent = translations[state.language][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (translations[state.language][key]) {
                el.placeholder = translations[state.language][key];
            }
        });

        // Update settings language button
        if (elements.settingsLangToggle) {
            elements.settingsLangToggle.textContent = state.language === 'ar' ? 'English' : 'العربية';
        }

        if (elements.languageToggle) {
            elements.languageToggle.title = state.language === 'ar' ? 'تغيير إلى الإنجليزية' : 'Switch to Arabic';
            elements.languageToggle.setAttribute('aria-label', elements.languageToggle.title);
        }
    }

    function toggleSidebar(open) {
        state.sidebarOpen = open !== undefined ? open : !state.sidebarOpen;

        elements.sidebar.classList.toggle('hidden', !state.sidebarOpen);
        elements.overlay?.classList.toggle('active', state.sidebarOpen);
        elements.appContainer.classList.toggle('sidebar-hidden', !state.sidebarOpen);
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = {
            success: 'check-circle-2',
            error: 'alert-circle',
            warning: 'alert-triangle'
        };
        toast.innerHTML = `
            <i data-lucide="${icons[type]}"></i>
            <span>${message}</span>
        `;
        elements.toastContainer.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.style.animation = 'toastSlideIn 0.3s reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function handleModalClose(e) {
        if (e.target.closest('[data-close-modal]') || e.target === elements.taskModal) {
            closeTaskModal();
        }
    }

    function handleCalNav(e) {
        if (e.target.closest('#cal-prev')) {
            state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
            renderCalendar();
        } else if (e.target.closest('#cal-next')) {
            state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
            renderCalendar();
        } else if (e.target.closest('#cal-today')) {
            state.calendarDate = new Date();
            state.selectedCalendarDate = null;
            renderCalendar();
        }
    }

    /**
     * Keyboard Shortcuts
     */
    function handleKeydown(e) {
        // Cmd/Ctrl + K for search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            elements.globalSearch?.focus();
        }

        // Escape to close modal
        if (e.key === 'Escape') {
            closeTaskModal();
        }

        // N for new task
        if (e.key === 'n' && !e.target.matches('input, textarea, select')) {
            e.preventDefault();
            openTaskModal();
        }
    }

    /**
     * Responsive Handling
     */
    function handleResize() {
        if (window.innerWidth > 1024) {
            toggleSidebar(true);
        } else {
            toggleSidebar(false);
        }
    }

    /**
     * Event Binding
     */
    function bindEvents() {
        // Sidebar
        elements.menuToggle?.addEventListener('click', () => toggleSidebar(true));
        elements.closeSidebar?.addEventListener('click', () => toggleSidebar(false));
        elements.overlay?.addEventListener('click', () => toggleSidebar(false));
        elements.languageToggle?.addEventListener('click', handleSettingsLangToggle);

        // Navigation
        document.querySelector('.sidebar-nav')?.addEventListener('click', handleNavClick);
        document.querySelector('.sidebar-footer')?.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item[data-view]');
            if (navItem) {
                showView(navItem.dataset.view);
            }
        });

        // View buttons in headers
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.classList.contains('nav-item')) return; // Handled by sidebar-nav or footer
                showView(btn.dataset.view);
            });
        });

        // Task actions (event delegation)
        elements.dashboardTaskList?.addEventListener('click', handleTaskAction);
        elements.fullTaskList?.addEventListener('click', handleTaskAction);
        elements.agendaList?.addEventListener('click', handleTaskAction);

        // Calendar
        elements.calendarGrid?.addEventListener('click', handleCalendarDayClick);
        elements.calPrev?.addEventListener('click', handleCalNav);
        elements.calNext?.addEventListener('click', handleCalNav);
        elements.calToday?.addEventListener('click', handleCalNav);

        // Search
        elements.globalSearch?.addEventListener('input', handleSearch);

        // Filters
        elements.priorityFilter?.addEventListener('change', handlePriorityFilter);
        elements.sortFilter?.addEventListener('change', handleSortFilter);
        document.querySelector('.tabs')?.addEventListener('click', handleTabClick);

        // Modal
        elements.taskForm?.addEventListener('submit', handleTaskSubmit);
        elements.taskModal?.addEventListener('click', handleModalClose);
        document.querySelectorAll('[data-open-modal="task"]').forEach(btn => {
            btn.addEventListener('click', () => openTaskModal());
        });

        // Settings
        elements.settingsLangToggle?.addEventListener('click', handleSettingsLangToggle);
        elements.exportData?.addEventListener('click', exportData);
        elements.importData?.addEventListener('click', () => elements.importFile?.click());
        elements.importFile?.addEventListener('change', (e) => {
            if (e.target.files[0]) importData(e.target.files[0]);
        });
        elements.clearData?.addEventListener('click', clearAllData);

        // Keyboard
        document.addEventListener('keydown', handleKeydown);

        // Resize
        window.addEventListener('resize', handleResize);
    }

    /**
     * Initialization
     */
    function init() {
        bindEvents();
        loadTasks();

        // Initial setup for RTL/LTR
        applyLanguage();

        // Set default date for new tasks
        elements.taskDate?.setAttribute('min', new Date().toISOString().split('T')[0]);

        renderAll();

        console.log('TASKFLOW Professional Initialized.');
    }

    // Start the app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();