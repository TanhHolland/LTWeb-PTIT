'use strict';

function FixedDate(month, day, year){
    this.year = year;
    this.month = month;
    this.day = day;
}

function DatePicker(id, callback){
    this.id = id;
    this.ele = document.getElementById(id);
    this.callback = callback;
    this.container = document.createElement('div');
    this.table = document.createElement('table'); 
    this.decreaseMonth = document.createElement('button');
    this.increaseMonth = document.createElement('button');
    this.headerTable = document.createElement('th');
    this.setDecreaseMonthHandler(this.decreaseMonth, this);
    this.setIncreaseMonthHandler(this.increaseMonth, this);
    this.dayMonth = {
        0: 31, 
        1: 28, 
        2: 31, 
        3: 30, 
        4: 31, 
        5: 30, 
        6: 31, 
        7: 31, 
        8: 30, 
        9: 31, 
        10: 30,
        11: 31
    };
    this.month = undefined;
    this.year = undefined;
    this.setHeader();
}

DatePicker.prototype.isLeapYear = function(year){
    if(year % 100 === 0 && year % 400 === 0) return true;
    if(year % 100 !== 0 && year % 4 === 0) return true;
    return false;
};

DatePicker.prototype.getDayBeforeMonth = function(month, firstDay){
    var dayBeforeMonths = [];
    var maxDayLastMonth;
    if(month === 0){
        maxDayLastMonth = 31;
    }
    else{
        maxDayLastMonth = this.dayMonth[month-1];
    }
    // console.log(maxDayLastMonth)
    for(let i = 0;i < firstDay; i++){
        dayBeforeMonths.push(maxDayLastMonth - firstDay  + i  + 1);
    }
    // console.log(dayBeforeMonths, firstDay)
    return dayBeforeMonths;
};

DatePicker.prototype.getDayAfterMonth = function(month, lastDay){
    var dayAfterMonth = [];
    var start = 1;
    for(let i = lastDay + 1; i <= 6; i++){
        dayAfterMonth.push(start++);
    }
    // console.log(lastDay,dayAfterMonth)
    return dayAfterMonth;
};

DatePicker.prototype.render = function(date){
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.updateTable(date);    
};

DatePicker.prototype.updateTable = function(date){
   
    while(this.table.rows.length > 2){
        this.table.deleteRow(this.table.rows.length - 1);
    } 
   
    var month = date.getMonth();
    var year = date.getFullYear();
    
    this.headerTable.textContent = (month + 1) + '/' + year;
    
    if(this.isLeapYear(year)) {
        this.dayMonth[1] = 29;
    }
    else{
        this.dayMonth[1] = 28;
    }
    var dayBeforeMonth = this.getDayBeforeMonth(month, new Date(year, month, 1).getDay());
    var dayAfterMonth = this.getDayAfterMonth(month,new Date(year, month,this.dayMonth[month]).getDay());
    var daysMonthCurrent = [];
    for(let i = 1; i <= this.dayMonth[month]; i++){
        daysMonthCurrent.push(i);
    }
    
    this.displayInTable(dayBeforeMonth, daysMonthCurrent, dayAfterMonth);
};

DatePicker.prototype.displayInTable = function(dayBeforeMonth, daysMonthCurrent, dayAfterMonth){
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    while(pos1<dayBeforeMonth.length||pos2<daysMonthCurrent.length||pos3<dayAfterMonth.length){
        var curRow = document.createElement('tr');
        for(let i = 0;i <= 6; i++){
            var curVal = document.createElement('td');
            if(pos1 < dayBeforeMonth.length){
                curVal.textContent = dayBeforeMonth[pos1++];
                curVal.className = 'outBound';
            } 
            else if(pos2 < daysMonthCurrent.length){
                curVal.textContent = daysMonthCurrent[pos2++];
                curVal.className = 'inBound';   
                this.setSelectDateHandler(curVal, this);
            }
            else if(pos3 < dayAfterMonth.length){
                curVal.textContent = dayAfterMonth[pos3++];
                curVal.className = 'outBound';
            }
            curRow.appendChild(curVal);
        }
        this.table.appendChild(curRow);
    }  
};

DatePicker.prototype.setSelectDateHandler = function(ele, parent){ 
    if(typeof parent.callback === 'function'){
        ele.onclick = function(){
            var prevSelected = document.getElementById('selected');
            if(prevSelected !== null){
                prevSelected.id = null;
            }
            ele.id = 'selected';

            parent.callback(parent.id, new FixedDate(parent.month + 1,  Number(ele.textContent), parent.year));
        };
    }
};

DatePicker.prototype.setDecreaseMonthHandler = function(ele, parent){
    ele.onclick = function(){
        if(parent.month === undefined || parent.year === undefined){
            return;
        }
        if(parent.month === 0){
            parent.month = 11;
            parent.year--;
        }
        else{
            parent.month--;
        }
        parent.updateTable(new Date(parent.year, parent.month));
    };
};

DatePicker.prototype.setIncreaseMonthHandler = function(ele, parent){
    ele.onclick = function(){
        if(parent.month === undefined || parent.year === undefined){
            return;
        }
        if(parent.month === 11){
            parent.year++;
            parent.month = 0;
        }
        else{
            parent.month++;
        }   
        parent.updateTable(new Date(parent.year, parent.month));
    };
};

DatePicker.prototype.setHeader = function(){

    var thead = document.createElement('thead');
    
    var top = document.createElement('tr');
    var leftBotton = document.createElement('th');
    this.decreaseMonth.textContent = '<';
    leftBotton.appendChild(this.decreaseMonth);
    
    this.headerTable.colSpan = '5';
    this.headerTable.textContent = 'xx/xxxx';
    var rightBotton = document.createElement('th');
    this.increaseMonth.textContent = '>';
    rightBotton.appendChild(this.increaseMonth);
    
    top.appendChild(leftBotton);
    top.appendChild(this.headerTable);
    top.appendChild(rightBotton);
    
    thead.appendChild(top);
    
    var header = document.createElement('tr');
    var daysInWeek = ['Su', 'Mo','Tu','We','Th','Fr','Sa'];
    for(let i = 0; i < daysInWeek.length; i++){
        var tmp = document.createElement('th');
        tmp.textContent = daysInWeek[i];
        header.appendChild(tmp);
    }

    thead.appendChild(header);
    this.table.appendChild(thead);
    
    this.container.appendChild(this.table);
    this.ele.appendChild(this.container);
    
};
