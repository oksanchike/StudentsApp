var Chart = Base.extend({
    constructor: function(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.toolTip = document.createElement("canvas");
        this.tooltipContext = this.toolTip.getContext("2d");
        this.pieX = (this.canvas.width) / 2;
        this.pieY = (this.canvas.height) / 2 + 50;
        this.pieRadius = Math.min(this.canvas.width, this.canvas.height) / 2 - 60;
        this.lineX = 20;
        this.lineY = 30;
        this.lineHeight = 25;
        this.lineWidth = this.canvas.width - 40;
        this.__initEventHandlers();
        this.__oldElapsed = 0;
        this.__oldTotalAbsense = 0;
        this.__oldWithValidReason = 0;
    },
    drawForStudent: function(dataStudentsPresence, dataSubjects) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.__dataStudentsPresence = dataStudentsPresence;
        this.__dataSubjects = dataSubjects;
        var totalHours = this.__getTotalHours();
        this.__drawLineChart(totalHours);
        this.__drawSubjectsTotalText();
        this.__drawTotalDoughnutChart();
    },
    __drawSubjectsTotalText: function () {
        var subjectTitle = document.getElementById("SelectedSubjectTitle");
        subjectTitle.innerHTML = "Все предметы" + " ( " + this.__getTotalHours() + " часов )";
    },
    __drawEmptyDoughnut: function (withShadow) {
        var context = this.context;
        context.save();
        if (withShadow) {
            context.shadowBlur = 15;
            context.shadowColor = "#999";
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 3;
        }
        context.beginPath();
        context.arc(this.pieX, this.pieY, this.pieRadius - 30, 0, 2 * Math.PI, false);
        context.lineWidth = 30;
        context.strokeStyle = "#E8E8E8";
        context.stroke();
        context.closePath();
        context.restore();
    },
    __drawDoughnutChart: function (total, elapsed, totalAbsense, withValidReason) {
        var context = this.context;
        if (this.__intervalId)
            clearInterval(this.__intervalId);
        var height = this.pieRadius * 2 + 40;
        var y = this.pieY - this.pieRadius - 20;
        this.context.clearRect(0, y, this.canvas.width, height);
        this.__drawEmptyDoughnut(true);

        var dElapsed = (elapsed / total - this.__oldElapsed) / 50;
        var dTotalAbsense = (totalAbsense / total - this.__oldTotalAbsense) / 50;
        var dWithValidReason = (withValidReason / total - this.__oldWithValidReason) / 50;
        var self = this;
        var iteration = 1;
        this.__intervalId = setInterval(function () {
            self.__drawEmptyDoughnut(false);
            self.__oldElapsed += dElapsed;
            self.__oldTotalAbsense += dTotalAbsense;
            self.__oldWithValidReason += dWithValidReason;
            self.__drawSlices(self.__oldElapsed, self.__oldTotalAbsense, self.__oldWithValidReason);

            if (++iteration > 50)
                clearInterval(self.__intervalId);
        }, 10);

        this.__drawDoughnutDivision(total);
        context.save();
        this.__drawTextAboutPresence(this.pieY - 50, "Всего пройдено", "normal 11pt PT Sans");
        this.__drawNumberAboutPresence(this.pieY - 30, elapsed, "#FFCC00");
        this.__drawTextAboutPresence(this.pieY - 10, "Всего прогуляно", "normal 10pt PT Sans");
        this.__drawNumberAboutPresence(this.pieY + 10, totalAbsense, "rgb(153, 0, 0)");
        this.__drawTextAboutPresence(this.pieY + 30, "Из них", "normal 9pt PT Sans");
        this.__drawTextAboutPresence(this.pieY + 45, "по уважительной причине", "normal 9pt PT Sans");
        this.__drawNumberAboutPresence(this.pieY + 65, withValidReason, "#0099CC");
        context.restore();
    },
    __drawSlices: function (elapsed, totalAbsense, withValidReason) {
        var startAngle = 1.5 * Math.PI;
        var sliceAngle = 2 * Math.PI * withValidReason;
        var endAngle = startAngle + sliceAngle;
        this.__drawArc(startAngle, endAngle, "#0099CC");

        startAngle = endAngle;
        sliceAngle = 2 * Math.PI * (totalAbsense - withValidReason);
        endAngle = startAngle + sliceAngle;
        this.__drawArc(startAngle, endAngle, "#990000");

        startAngle = endAngle;
        sliceAngle = 2 * Math.PI * (elapsed - totalAbsense);
        endAngle = startAngle + sliceAngle;
        this.__drawArc(startAngle, endAngle, "#FFCC00");
    },
    __drawRectangleDivision: function (x, y, l, text) {
        var context = this.context;

        context.save();
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x, y - l);
        context.strokeStyle = "#000";
        context.lineWidth = 0.5;
        context.stroke();
        context.closePath();
        if (text !== undefined) {
            var dx = x - this.context.measureText(text).width / 2;
            var dy = y - l - 4;

            context.fillStyle = "#999";
            context.font = "normal 10pt PT Sans";
            context.fillText(text, dx, dy);
        }
        context.restore();
    },
    __drawTotalDoughnutChart: function() {
        var total = this.__getTotalHours();
        var elapsed = this.__getElapsedHours();
        var totalAbsenseTime = this.__getTotalAbsenseTime();
        var withValidReasonTime = this.__getWithValidReasonTime();
        this.__drawDoughnutChart(total, elapsed, totalAbsenseTime, withValidReasonTime);
    },
    __drawLineChart: function(totalHours) {
        var lineChartWidth = this.canvas.width - 40;
        var ratio = totalHours / lineChartWidth;
        var quarter = lineChartWidth / 4;
        var x = 19;
        var y = 30;

        var xFirstQuarter = quarter + x;
        var xMiddle = quarter * 2 + x;
        var xThirdQuarter = quarter * 3 + x;
        var xLast = quarter * 4 + x;

        this.__drawRectangles(totalHours, ratio, x + 1, y);
        this.__drawRectangleDivision(x + 2, y, 13, 0);
        this.__drawRectangleDivision(xFirstQuarter, y, 5);
        this.__drawRectangleDivision(xMiddle, y, 13, totalHours / 2);
        this.__drawRectangleDivision(xThirdQuarter, y, 5);
        this.__drawRectangleDivision(xLast, y, 13, totalHours);
    },
    __drawEmptyLine: function(x, y) {
        var context = this.context;
        context.save();
        var height = 25;
        var rectangleWidth = this.lineWidth;
        context.beginPath();
        context.rect(x, y, rectangleWidth, height);
        context.fillStyle = "#E8E8E8";
        context.fill();
        context.restore();
    },
    __drawRectangles: function(totalLength, ratio, x, y) {
        var context = this.context;
        this.__drawEmptyLine(x, y);
        context.save();
        var height = 25;
        this.sudjectsFromLineChart = [];
        var colors = ["#09CC8A", "#FFE6F1", "#96E400", "#FA3A8D", "#F7A4C2", "#5A5192", "#FF8600", "#FFBE00", "#F68D5C", "#32728C"];
        for (var i = 0; i < this.__dataSubjects.length; i++) {
            for (var j = 0; j < this.__dataStudentsPresence.length; j++) {
                if (this.__dataStudentsPresence[j].subjectId === this.__dataSubjects[i].id
                    && this.__dataStudentsPresence[j].studying) {
                    var rectangleWidth = this.__dataSubjects[i].totalTime / ratio;
                    context.beginPath();
                    context.rect(x, y, rectangleWidth, height);
                    context.fillStyle = colors[this.__dataSubjects[i].id - 1];
                    context.fill();
                    var sudjectWithCoordinat = {
                        total: this.__dataSubjects[i].totalTime,
                        elapsed: this.__dataSubjects[i].elapsedTime,
                        totalAbsense: this.__dataStudentsPresence[j].totalAbsenseTime,
                        withValidReason: this.__dataStudentsPresence[j].withValidReasonTime,
                        title: this.__dataSubjects[i].title,
                        x: x,
                        width: rectangleWidth
                    };
                    this.sudjectsFromLineChart.push(sudjectWithCoordinat);
                    x += rectangleWidth;
                    break;
                }
            }
        }
        context.restore();
    },
    __drawSubjectText: function(total, title) {
        var subjectTitle = document.getElementById("SelectedSubjectTitle");
        if (total)
            subjectTitle.innerHTML = title + " ( " + total + " часов )";
        else
            this.__drawSubjectsTotalText();
    },
    __drawDoughnutDivision: function(total) {
        var context = this.context;
        context.save();
        context.fillStyle = "black";
        context.font = "normal 11pt PT Sans";
        var dx = this.context.measureText("0").width / 2;
        context.fillText("0", this.pieX - dx, this.pieY - 135);
        var half = total / 2;
        var quarter = total / 4;
        dx = this.context.measureText(half).width / 2;
        context.fillText(half, this.pieX - dx, this.pieY + 145);
        context.fillText(quarter, this.pieX + 135, this.pieY);
        dx = this.context.measureText(quarter + half).width;
        context.fillText(quarter + half, this.pieX - 135 - dx, this.pieY);
        context.closePath();
        context.restore();
    },
    __drawTextAboutPresence: function(yText, text, font) {
        var context = this.context;
        context.fillStyle = "black";
        context.font = font;
        var dx = this.context.measureText(text).width / 2;
        context.fillText(text, this.pieX - dx, yText);
        context.closePath();
    },
    __drawNumberAboutPresence: function(yNumber, number, color) {
        var context = this.context;
        context.font = "bold 11pt PT Sans";
        context.fillStyle = color;
        var dx = this.context.measureText(number).width / 2;
        context.fillText(number, this.pieX - dx, yNumber);
        context.closePath();
    },
    __drawArc: function(startAngle, endAngle, color) {
        var context = this.context;
        context.save();
        context.beginPath();
        context.arc(this.pieX, this.pieY, this.pieRadius - 30, startAngle, endAngle, false);
        context.lineWidth = 30;
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
        context.restore();
    },
    __getTotalHours: function() {
        var dataSubjects = this.__dataSubjects;
        var total = 0;
        var self = this;
        for (var i = 0; i < dataSubjects.length; i++) {
            for (var j = 0; j < self.__dataStudentsPresence.length; j++) {
                if (self.__dataStudentsPresence[j].subjectId === self.__dataSubjects[i].id)
                    if (self.__dataStudentsPresence[j].studying)
                        total += dataSubjects[i].totalTime;
            }
        }
        return total;
    },
    __getElapsedHours: function() {
        var dataSubjects = this.__dataSubjects;
        var elapsed = 0;
        var self = this;
        for (var i = 0; i < dataSubjects.length; i++) {
            for (var j = 0; j < self.__dataStudentsPresence.length; j++) {
                if (self.__dataStudentsPresence[j].subjectId === self.__dataSubjects[i].id)
                    if (self.__dataStudentsPresence[j].studying)
                        elapsed += dataSubjects[i].elapsedTime;
            }
        }
        return elapsed;
    },
    __getTotalAbsenseTime: function() {
        var totalAbsenseTime = 0;
        var self = this;
        for (var i = 0; i < self.__dataStudentsPresence.length; i++) {
            if (self.__dataStudentsPresence[i].studying)
                totalAbsenseTime += self.__dataStudentsPresence[i].totalAbsenseTime;
        }
        return totalAbsenseTime;
    },
    __getWithValidReasonTime: function() {
        var withValidReasonTime = 0;
        var self = this;
        for (var i = 0; i < self.__dataStudentsPresence.length; i++) {
            if (self.__dataStudentsPresence[i].studying)
                withValidReasonTime += self.__dataStudentsPresence[i].withValidReasonTime;
        }
        return withValidReasonTime;
    },
    __getSubjectByCoordinates: function(mouseX) {
        for (var i = 0; i < this.sudjectsFromLineChart.length; i++) {
            var subject = this.sudjectsFromLineChart[i];
            if (mouseX >= subject.x && mouseX <= subject.x + subject.width)
                return subject;
        }
    },
    __isMouseOnLine: function(mouseX, mouseY) {
        return mouseX >= this.lineX && mouseX <= this.lineWidth + this.lineX && mouseY >= this.lineY && mouseY <= this.lineHeight + this.lineY;
    },
    __showToolTip: function(title, mouseX, mouseY) {
        var div = document.getElementById("CanvasContainer");
        this.tooltipContext.fillStyle = "#bdbdbd";
        this.tooltipContext.beginPath();
        this.tooltipContext.font = "normal 11pt PT Sans";
        var width = this.tooltipContext.measureText(title).width + 10;
        this.toolTip.classList.add("toolTip");
        this.toolTip.width = width;
        this.toolTip.height = 20;
        this.toolTip.setAttribute("style", "left:" + mouseX + "px; " + "top:" + mouseY + "px");
        this.tooltipContext.font = "normal 11pt PT Sans";
        this.tooltipContext.fillText(title, 5, 15);
        this.tooltipContext.closePath();
        div.appendChild(this.toolTip);
    },
    __hideToolTip: function() {
        if (this.toolTip && this.toolTip.parentNode)
            this.toolTip.parentNode.removeChild(this.toolTip);
    },
    __initEventHandlers: function() {
        var self = this;
        this.canvas.onclick = function(e) {
            var mouseX = e.offsetX;
            var mouseY = e.offsetY;
            if (self.__isMouseOnLine(mouseX, mouseY)) {
                var subject = self.__getSubjectByCoordinates(mouseX);
                if (subject) {
                    self.__drawSubjectText(subject.total, subject.title);
                    self.__drawDoughnutChart(subject.total, subject.elapsed, subject.totalAbsense, subject.withValidReason);
                }
            }
        };
        this.canvas.onmousemove = function(e) {
            var mouseX = e.offsetX;
            var mouseY = e.offsetY;
            if (self.__isMouseOnLine(mouseX, mouseY)) {
                var subject = self.__getSubjectByCoordinates(mouseX);
                if (subject) {
                    self.__hideToolTip();
                    self.__showToolTip(subject.title, mouseX, mouseY + 30);
                    self.canvas.setAttribute("style", "cursor: pointer");
                }
            } else {
                self.__hideToolTip();
                self.canvas.setAttribute("style", "cursor: default");
            }
        };
        this.canvas.onmouseleave = function() {
            self.__hideToolTip();
        };
        document.getElementById("TotalStatistics").onclick = function () {
            self.__drawSubjectText();
            self.__drawTotalDoughnutChart();
        };
    }
});