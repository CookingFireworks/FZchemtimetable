// 应用程序主模块 - 专用于化学教师
class ChemistryListeningAssistant {
    constructor() {
        this.teachersData = null;
        this.chemistryTeachers = [];
        this.initializeApp();
    }

    // 初始化应用
    async initializeApp() {
        try {
            await this.loadTeacherData();
            this.setupEventListeners();
            this.populateTeacherSelects();
        } catch (error) {
            this.showNotification('加载教师数据失败: ' + error.message, true);
            console.error('加载数据错误:', error);
        }
    }

    // 加载教师数据
    async loadTeacherData() {
        // 使用相对路径加载数据
        const response = await fetch('./data/teachers.json');
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        this.teachersData = await response.json();
        this.chemistryTeachers = this.teachersData.chemistry || [];
    }

    // 设置事件监听器
    setupEventListeners() {
        const searchBtn = document.getElementById('search-btn');
        searchBtn.addEventListener('click', () => {
            this.generateSchedule();
        });
    }

    // 填充教师选择框
    populateTeacherSelects() {
        const mySelect = document.getElementById('my-select');
        const otherSelect = document.getElementById('other-select');

        this.clearSelect(mySelect);
        this.clearSelect(otherSelect);

        this.chemistryTeachers.forEach(teacher => {
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

    // 生成课表
    generateSchedule() {
        const myTeacherName = document.getElementById('my-select').value;
        const otherTeacherName = document.getElementById('other-select').value;

        if (!this.validateInputs(myTeacherName, otherTeacherName)) return;

        const myTeacher = this.chemistryTeachers.find(t => t.name === myTeacherName);
        const otherTeacher = this.chemistryTeachers.find(t => t.name === otherTeacherName);

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
                <p><strong>学科：</strong>化学</p>
            </div>
            <div class="teacher-card other">
                <h3>听课对象信息</h3>
                <p><strong>姓名：</strong>${otherTeacher.name}</p>
                <p><strong>学科：</strong>化学</p>
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

        // 添加最佳听课时间建议
        if (availableTimes.length > 0) {
            const bestTime = availableTimes[0];
            const bestSuggestion = document.createElement('div');
            bestSuggestion.className = 'suggestion-item';
            bestSuggestion.style.borderLeftColor = '#3498db';
            bestSuggestion.innerHTML = `<strong>推荐时间</strong>：${bestTime.day}${bestTime.period}（${bestTime.class}班），这是本周最早的可听课时间。`;
            suggestions.appendChild(bestSuggestion);
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
    new ChemistryListeningAssistant();
});
