// ASCII艺术库（50个不同的ASCII艺术）
const asciiArts = [
    `   /\\_/\\\n  ( o.o )\n   > ^ <`,
    `    /\\_/\\\n   (='.'=)\n   (")_(")`,
    `   (\\__/)\n   (•ㅅ•)\n   / 　 づ`,
    `    ／l、\n   （ﾟ､ ｡ ７\n    l  ~ヽ\n    じしf_,)ノ`,
    `    ／￣￣￣￣￣￣￣￣￣\n   |  Hello, Teacher! \n    ＼\n     ￣￣∨￣￣￣￣￣￣\n     　 　 (__)\n     　 　 /∞\\`,
    `     .--. \n    |o_o | \n    |:_/ | \n   //   \\ \\ \n  (|     | ) \n /'\\_   _/\`\\\n \\___)=(___/`,
    `   ╱|、\n  (˚ˎ 。7  \n   |、˜〵          \n   じしˍ,)ノ`,
    `    .-----.\n   / .--. \\\n  / /    \\ \\\n  | |    | |\n  \\ \\__. / /\n   '.___.'`,
    `     .-""-.\n    / .--. \\\n   / /    \\ \\\n   | |    | |\n   \\ \\__. / /\n    '.___.'`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=|=.\\\\\n // .=|=. \\\n \\\\ .=|=. //\n  \\(___)//`,
    `        .-.\n       (o.o)\n        |=|\n       __|__\n      //.=.\\\\\n     // .=. \\\n    //  .=  \\\n   //   .=   \\\n  (|    .=    |)\n   \\\\   .=   //\n    \\\\  .  //\n     \\\\ . //\n      \\\\.//\n       )=( \n      /___\\\n     (|___|)`,
    `        __\n       /  \\\n      |    |\n   ___|    |___\n  /   \\ -- /   \\\n |  O  |  |  O  |\n |     |  |     |\n  \\___/ -- \\___/`,
    `       .-.\n      |_:_|\n     /(_Y_)\\\n    ( \\/M\\/ )\n     \\/'-'\\/\n      |_|_|\n      |_|_|`,
    `         _\n        / \\\n       / _ \\\n      / | | \\\n     /  |_|  \\\n    /    _    \\\n   /    (_)    \\\n  /_____________\\`,
    `         .--.\n        /    \\\n       /      \\\n      /  .--.  \\\n     /  /    \\  \\\n    |  |      |  |\n    |  |      |  |\n     \\  \\____/  /\n      \\________/`,
    `        .-""-.\n       /      \\\n      /        \\\n     /          \\\n    |   .-----.   |\n    |  /       \\  |\n    |  \\       /  |\n     \\  '-----'  /\n      \\________/`,
    `       .-""""-.\n      /        \\\n     /          \\\n    |            |\n    |            |\n    |            |\n     \\          /\n      \\________/`,
    `        .-.\n       (   )\n        )=( \n       /   \\\n      /     \\\n     /       \\\n    /         \\\n   /           \\\n  (_____________)`,
    `         _\n        ( )\n        |=|\n        | |\n        | |\n       /   \\\n      /     \\\n     /       \\\n    (_________)`,
    `        .---.\n       /     \\\n      /       \\\n     /         \\\n    |           |\n    |           |\n    |           |\n     \\         /\n      \\_______/`,
    `         .-.\n        (   )\n         \\ /\n         / \\\n        /   \\\n       /     \\\n      /       \\\n     (_________)`,
    `        .-.\n       (   )\n        \\_/\n        /_\\\n       /___\\\n      /_____\\\n     (_______)`,
    `        .-.\n       (   )\n        \\_/\n        / \\\n       /   \\\n      /     \\\n     (_______)`,
    `         _\n        ( )\n        |=|\n        | |\n        | |\n       /___\\\n      /_____\\\n     (_______)`,
    `        .-.\n       (   )\n        \\_/\n        /_\\\n       /___\\\n      /_____\\\n     (_______)`,
    `         .-.\n        (   )\n         \\_/\n         / \\\n        /   \\\n       /     \\\n      (_______)`,
    `    .-""-.\n   / .--. \\\n  / /    \\ \\\n  | |    | |\n  \\ \\__. / /\n   '.___.'`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`,
    `     .-.\n    (o.o)\n     |=|\n    __|__\n   //.=.\\\\\n  // .=. \\\n  \\\\ .=. //\n   (___)`,
    `    .-.\n   (o.o)\n    |=|\n   __|__\n  //.=.\\\\\n // .=. \\\n \\\\ .=. //\n  (___)`
];

// 全局变量
let teachersData = {};

// DOM元素
const welcomeModal = document.getElementById('welcomeModal');
const closeModalBtn = document.getElementById('closeModal');
const gradeSelect = document.getElementById('gradeSelect');
const teacherSelect = document.getElementById('teacherSelect');
const showScheduleBtn = document.getElementById('showSchedule');
const scheduleContainer = document.getElementById('scheduleContainer');
const teacherNameElem = document.getElementById('teacherName');
const teacherGradeElem = document.getElementById('teacherGrade');
const scheduleTable = document.getElementById('scheduleTable');
const asciiArtElem = document.getElementById('asciiArt');

// 显示随机ASCII艺术
function showRandomAsciiArt() {
    const randomIndex = Math.floor(Math.random() * asciiArts.length);
    asciiArtElem.textContent = asciiArts[randomIndex];
}

// 加载教师数据
async function loadTeachersData() {
    try {
        const response = await fetch('teachers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        teachersData = await response.json();
        console.log('教师数据加载成功');
    } catch (error) {
        console.error('加载教师数据失败:', error);
        // 显示错误信息
        alert('加载教师数据失败，请检查网络连接或联系管理员。');
    }
}

// 关闭欢迎模态框
function setupModalClose() {
    closeModalBtn.addEventListener('click', function() {
        welcomeModal.style.display = 'none';
    });
}

// 设置年级选择事件
function setupGradeSelect() {
    gradeSelect.addEventListener('change', function() {
        const selectedGrade = this.value;
        teacherSelect.innerHTML = '<option value="">请选择老师</option>';
        
        if (selectedGrade) {
            teacherSelect.disabled = false;
            const teachers = teachersData.chemistry.filter(teacher => teacher.grade === selectedGrade);
            
            teachers.forEach(teacher => {
                const option = document.createElement('option');
                option.value = teacher.name;
                option.textContent = teacher.name;
                teacherSelect.appendChild(option);
            });
        } else {
            teacherSelect.disabled = true;
        }
    });
}

// 显示课表
function setupScheduleDisplay() {
    showScheduleBtn.addEventListener('click', function() {
        const selectedTeacherName = teacherSelect.value;
        
        if (!selectedTeacherName) {
            alert('请选择一位老师');
            return;
        }
        
        const teacher = teachersData.chemistry.find(t => t.name === selectedTeacherName);
        
        if (teacher) {
            teacherNameElem.textContent = teacher.name;
            teacherGradeElem.textContent = teacher.grade;
            
            // 清空表格
            scheduleTable.innerHTML = '';
            
            // 创建表头
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>节次/星期</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th>';
            scheduleTable.appendChild(headerRow);
            
            // 所有可能的节次
            const periods = ["第一节", "第二节", "第三节", "第四节", "第五节", "第六节", "第七节", "第八节", "第九节"];
            
            // 为每个节次创建行
            periods.forEach(period => {
                const row = document.createElement('tr');
                const periodCell = document.createElement('td');
                periodCell.textContent = period;
                periodCell.className = 'day-header';
                row.appendChild(periodCell);
                
                // 为每个星期创建单元格
                const days = ["星期一", "星期二", "星期三", "星期四", "星期五"];
                days.forEach(day => {
                    const cell = document.createElement('td');
                    
                    if (teacher.schedule[day] && teacher.schedule[day][period]) {
                        const classInfo = teacher.schedule[day][period];
                        cell.textContent = `${classInfo.class}班`;
                        cell.style.backgroundColor = '#e8f5e9';
                    } else {
                        cell.textContent = '-';
                    }
                    
                    row.appendChild(cell);
                });
                
                scheduleTable.appendChild(row);
            });
            
            scheduleContainer.style.display = 'block';
            
            // 显示新的随机ASCII艺术
            showRandomAsciiArt();
        }
    });
}

// 初始化应用
async function initApp() {
    // 加载教师数据
    await loadTeachersData();
    
    // 设置事件监听器
    setupModalClose();
    setupGradeSelect();
    setupScheduleDisplay();
    
    // 显示随机ASCII艺术
    showRandomAsciiArt();
    
    console.log('应用初始化完成');
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);
