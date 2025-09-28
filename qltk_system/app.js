// 应用程序主模块
class ListeningAssistant {
    constructor() {
        this.teachersData = null;
        this.currentTeachers = [];
        this.initializeApp();
    }

    // 初始化应用
    async initializeApp() {
        try {
            await this.loadTeacherData();
            this.setupEventListeners();
            this.populateSubjectSelect();
        } catch (error) {
            this.showNotification('加载教师数据失败: ' + error.message, true);
        }
    }

    // 加载教师数据
    async loadTeacherData() {
        // 从GitHub RAW链接加载数据
        const response = await fetch('https://raw.githubusercontent.com/yourusername/yourrepo/main/data/teachers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.teachersData = await response.json();
    }

    // 设置事件监听器
    setupEventListeners() {
        const subjectSelect = document.getElementById('subject-select');
        const searchBtn = document.getElementById('search-btn');

        subjectSelect.addEventListener('change', (e) => {
            this.onSubjectChange(e.target.value);
        });

        searchBtn.addEventListener('click', () => {
            this.generateSchedule();
        });
    }

    // 学科选择变化
    onSubjectChange(subject) {
        if (subject && this.teachersData[subject]) {
            this.currentTeachers = this.teachersData[subject];
            this.populateTeacherSelects();
        } else {
            this.currentTeachers = [];
            this.clearTeacherSelects();
        }
    }

    // 填充学科选择
    populateSubjectSelect() {
        const subjectSelect = document.getElementById('subject-select');
        subjectSelect.innerHTML = '<option value="">请选择学科</option>';
        
        Object.keys(this.teachersData).forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = this.getSubjectDisplayName(subject);
            subjectSelect.appendChild(option);
        });
    }

    // 获取学科显示名称
    getSubjectDisplayName(subject) {
        const names = {
            'chemistry': '化学',
            'physics': '物理',
            'math': '数学',
            'english': '英语',
            'chinese': '语文'
        };
        return names[subject] || subject;
    }

    // 填充教师选择框
    populateTeacherSelects() {
        const mySelect = document.getElementById('my-select');
        const otherSelect = document.getElementById('other-select');

        this.clearSelect(mySelect);
        this.clearSelect(otherSelect);

        this.currentTeachers.forEach(teacher => {
            const option1 = document.createElement('option');
            option1.value = teacher.name;
            option1.textContent = teacher.name;
            mySelect.appendChild(option1.cloneNode(true));
            
            const option2 = option1.cloneNode(true);
            otherSelect.appendChild(option2);
        });
    }

    // 清空选择框
    clearSelect(selectElement) {
        selectElement.innerHTML = '<option value="">请选择</option>';
    }

    // 清空教师选择框
    clearTeacherSelects() {
        this.clearSelect(document.getElementById('my-select'));
        this.clearSelect(document.getElementById('other-select'));
    }

    // 生成课表
    generateSchedule() {
        const myTeacherName = document.getElementById('my-select').value;
        const otherTeacherName = document.getElementById('other-select').value;

        if (!this.validateInputs(myTeacherName, otherTeacherName)) return;

        const myTeacher = this.currentTeachers.find(t => t.name === myTeacherName);
        const otherTeacher = this.currentTeachers.find(t => t.name === otherTeacherName);

        if (myTeacher && otherTeacher) {
            this.displayTeacherInfo(myTeacher, otherTeacher);
            this.displayCombinedSchedule(myTeacher, otherTeacher);
            this.generateSuggestions(myTeacher, otherTeacher);
            this.showNotification('听课计划已生成！');
        }
    }

    // 验证输入
    validateInputs(myTeacherName, otherTeacherName) {
        if (!myTeacherName || !otherTeacherName) {
            this.showNotification('请选择自己和听课对象', true);
            return false;
        }

        if (myTeacherName === otherTeacherName) {
            this.showNotification('不能选择相同的教师作为听课对象', true);
            return false;
        }

        return true;
    }

    // 显示教师信息
    displayTeacherInfo(myTeacher, otherTeacher) {
        const teacherInfo = document.getElementById('teacher-info');
        teacherInfo.innerHTML = `
            <div class="teacher-card">
                <h3>我的信息</h3>
                <p><strong>姓名：</strong>${myTeacher.name}</p>
                <p><strong>学科：</strong>${this.getSubjectDisplayName(document.getElementById('subject-select').value)}</p>
            </div>
            <div class="teacher-card other">
                <h3>听课对象信息</h3>
                <p><strong>姓名：</strong>${otherTeacher.name}</p>
                <p><strong>学科：</strong>${this.getSubjectDisplayName(document.getElementById('subject-select').value)}</p>
            </div>
        `;
    }

    // 显示合并课表
    displayCombinedSchedule(myTeacher, otherTeacher) {
        const scheduleTable = document.getElementById('schedule-table');
        scheduleTable.innerHTML = '';

        // 创建表头
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th class="period">节次/星期</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th>';
        scheduleTable.appendChild(headerRow);

        // 定义节次
        const periods = ["第一节", "第二节", "第三节", "第四节", "第五节", "第六节", "第七节", "第八节"];

        // 创建每一行的数据
        periods.forEach(period => {
            const row = document.createElement('tr');
            const periodCell = document.createElement('td');
            periodCell.className = 'period';
            periodCell.textContent = period;
            row.appendChild(periodCell);

            // 添加每一天的课程信息
            const days = ["星期一", "星期二", "星期三", "星期四", "星期五"];
            days.forEach(day => {
                const cell = document.createElement('td');
                const myClass = myTeacher.schedule[day] && myTeacher.schedule[day][period];
                const otherClass = otherTeacher.schedule[day] && otherTeacher.schedule[day][period];

                // 判断是否是可听课时间
                const isAvailableTime = !myClass && otherClass;

                if (isAvailableTime) {
                    cell.className = 'available-time';
                    cell.addEventListener('click', () => this.markListeningTime(cell, day, period));
                } else if (myClass) {
                    cell.className = 'my-class';
                } else if (otherClass) {
                    cell.className = 'other-class';
                }

                // 显示课程信息
                if (myClass && otherClass) {
                    cell.innerHTML = `<div><strong>我：</strong>${myClass.class}</div><div><strong>听：</strong>${otherClass.class}</div>`;
                } else if (myClass) {
                    cell.innerHTML = `<div><strong>我：</strong>${myClass.class}</div>`;
                } else if (otherClass) {
                    cell.innerHTML = `<div><strong>听：</strong>${otherClass.class}</div>`;
                } else {
                    cell.textContent = '-';
                }

                row.appendChild(cell);
            });

            scheduleTable.appendChild(row);
        });
    }

    // 标记听课时间
    markListeningTime(cell, day, period) {
        cell.style.backgroundColor = '#ffd966';
        cell.style.borderColor = '#e6b400';
        this.showNotification(`已标记 ${day}${period} 为听课时间`);
    }

    // 生成听课建议
    generateSuggestions(myTeacher, otherTeacher) {
        const suggestions = document.getElementById('suggestions');
        suggestions.innerHTML = '<h3>听课建议</h3>';

        const days = ["星期一", "星期二", "星期三", "星期四", "星期五"];
        const periods = ["第一节", "第二节", "第三节", "第四节", "第五节", "第六节", "第七节", "第八节"];

        let availableTimes = [];

        // 查找所有可听课时间
        days.forEach(day => {
            periods.forEach(period => {
                const myClass = myTeacher.schedule[day] && myTeacher.schedule[day][period];
                const otherClass = otherTeacher.schedule[day] && otherTeacher.schedule[day][period];

                if (!myClass && otherClass) {
                    availableTimes.push({
                        day: day,
                        period: period,
                        class: otherClass.class
                    });
                }
            });
        });

        if (availableTimes.length === 0) {
            suggestions.innerHTML += '<p>本周没有合适的听课时间，请尝试选择其他听课对象。</p>';
            return;
        }

        // 按天分组建议
        const timesByDay = {};
        availableTimes.forEach(time => {
            if (!timesByDay[time.day]) {
                timesByDay[time.day] = [];
            }
            timesByDay[time.day].push(time);
        });

        // 生成建议
        for (const day in timesByDay) {
            const daySuggestion = document.createElement('div');
            daySuggestion.className = 'suggestion-item';
            
            const timesText = timesByDay[day].map(time => 
                `${time.period}（${time.class}班）`
            ).join('、');
            
            daySuggestion.innerHTML = `<strong>${day}</strong>：${timesText}`;
            suggestions.appendChild(daySuggestion);
        }
    }

    // 显示通知
    showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification';
        
        if (isError) {
            notification.classList.add('error');
        }
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ListeningAssistant();
});