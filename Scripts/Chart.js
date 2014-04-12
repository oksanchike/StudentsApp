var Chart = Base.extend({
    constructor: function (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.pieX = (this.canvas.width) / 2;
        this.pieY = (this.canvas.height) / 2 + 50;
        this.pieRadius = Math.min(this.canvas.width, this.canvas.height) / 2 - 60;
    },
    drawForStudent: function (dataStudentsPresence, dataSubjects) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.__dataStudentsPresence = dataStudentsPresence;
        this.__dataSubjects = dataSubjects;
        var totalHours = this.getTotalHours();
        this.drawLineChart(totalHours);
        this.drawButton();
        this.drawTotalDoughnutChart();
    },
    drawTotalDoughnutChart: function () {
        var total = this.getTotalHours();
        var elapsed = this.getElapsedHours();
        var totalAbsenseTime = this.getTotalAbsenseTime();
        var withValidReasonTime = this.getWithValidReasonTime();
        this.drawDoughnutChart(total, elapsed, totalAbsenseTime, withValidReasonTime);
    },
    drawLineChart: function (totalHours) {
        var lineChartWidth = this.canvas.width - 40;
        var ratio = totalHours / lineChartWidth;
        var quarter = lineChartWidth / 4;
        var x = 19;
        var y = 30;

        var xFirstQuarter = quarter + x;
        var xMiddle = quarter * 2 + x;
        var xThirdQuarter = quarter * 3 + x;
        var xLast = quarter * 4 + x;

        this.drawRectangles(totalHours, ratio, x + 1, y);
        this.drawRectangleDivision(x + 2, y, 13, 0);
        this.drawRectangleDivision(xFirstQuarter, y, 5);
        this.drawRectangleDivision(xMiddle, y, 13, totalHours / 2);
        this.drawRectangleDivision(xThirdQuarter, y, 5);
        this.drawRectangleDivision(xLast, y, 13, totalHours);
    },
    drawRectangles: function (totalLength, ratio, x, y) {
        var context = this.context;
        context.save();
        var height = 25;
        var colors = ["#44456F", "#DA9C65", "#A24112", "#D58202", "3C301F", "#3FAE85", "#3BC3E1", "#374548", "#B87371", "#E13B7B"];
        var self = this;
        for (var i = 0; i < self.__dataSubjects.length; i++) {
            for (var j = 0; j < self.__dataStudentsPresence.length; j++) {
                if (self.__dataStudentsPresence[j].subjectId == self.__dataSubjects[i].id) {
                    if (self.__dataStudentsPresence[j].studying) {
                        var rectangleWidth = self.__dataSubjects[i].totalTime / ratio;
                        context.beginPath();
                        context.rect(x, y, rectangleWidth, height);
                        context.fillStyle = colors[self.__dataSubjects[i].id - 1];
                        context.fill();
                        x += rectangleWidth;
                        break;
                    }
                }
            }
        }
        context.restore();
    },
    drawRectangleDivision: function (x, y, l, text) {
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
    drawButton: function () {
        var context = this.context;
        var x1 = this.canvas.width - this.context.measureText("Все предметы").width;
        var x2 = x1 + this.context.measureText("Все предметы").width;
        context.save();
        context.fillStyle = "#2d89d5";
        context.beginPath();
        context.font = "normal 10.5pt PT Sans";
        context.fillText("Все предметы", x1, 85)
        context.moveTo(x1, 87);
        context.lineTo(x2, 87);
        context.strokeStyle = "#2d89d5";
        context.lineWidth = 1;
        context.stroke();
        context.closePath();
        context.restore();
    },
    drawSubjectsText: function () {
        var context = this.context;
        context.save();

        context.fillStyle = "black";
        context.beginPath();
        context.font = "normal 13pt PT Sans";
        context.fillText(this.__dataSubjects[0].title + " ( " + this.__dataSubjects[0].totalTime + " часов )", 20, 80)
        context.closePath();

        context.restore();
    },
    drawEmptyDoughnut: function () {
        var context = this.context;
        context.save();
        context.shadowBlur = 15;
        context.shadowColor = "#999";
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 3;
        context.beginPath();
        context.arc(this.pieX, this.pieY, this.pieRadius - 30, 0, 2 * Math.PI, false);
        context.lineWidth = 30;
        context.strokeStyle = "#E8E8E8";
        context.stroke();
        context.closePath();
        context.restore();
    },
    drawDoughnutChart: function (total, elapsed, totalAbsense, withValidReason) {
        var context = this.context;
        this.drawEmptyDoughnut();
        var startAngle = 1.5 * Math.PI;

        var sliceAngle = 2 * Math.PI * withValidReason / total;
        var endAngle = startAngle + sliceAngle;
        this.drawArc(startAngle, endAngle, "#0099CC");
        startAngle = endAngle;
        sliceAngle = 2 * Math.PI * (totalAbsense - withValidReason) / total;
        endAngle = startAngle + sliceAngle;
        this.drawArc(startAngle, endAngle, "#990000");
        startAngle = endAngle;
        sliceAngle = 2 * Math.PI * (elapsed - totalAbsense) / total;
        endAngle = startAngle + sliceAngle;
        this.drawArc(startAngle, endAngle, "#FFCC00");
        this.drawDoughnutDivision(total);
        context.save();
        this.drawTextAboutPresence(this.pieY - 50, "Всего пройдено", "normal 11pt PT Sans");
        this.drawNumberAboutPresence(this.pieY - 30, elapsed, "#FFCC00");
        this.drawTextAboutPresence(this.pieY - 10, "Всего прогуляно", "normal 10pt PT Sans");
        this.drawNumberAboutPresence(this.pieY + 10, totalAbsense, "rgb(153, 0, 0)");
        this.drawTextAboutPresence(this.pieY + 30, "Из них", "normal 9pt PT Sans");
        this.drawTextAboutPresence(this.pieY + 45, "по уважительной причине", "normal 9pt PT Sans");
        this.drawNumberAboutPresence(this.pieY + 65, withValidReason, "#0099CC");
        context.restore();
    },
    drawDoughnutDivision: function (total) {
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
    drawTextAboutPresence: function (yText, text, font) {
        var context = this.context;
        context.fillStyle = "black";
        context.font = font;
        var dx = this.context.measureText(text).width / 2;
        context.fillText(text, this.pieX - dx, yText);
        context.closePath();
    },
    drawNumberAboutPresence: function (yNumber, number, color) {
        var context = this.context;
        context.font = "bold 11pt PT Sans";
        context.fillStyle = color;
        var dx = this.context.measureText(number).width / 2;
        context.fillText(number, this.pieX - dx, yNumber);
        context.closePath();
    },
    drawArc: function (startAngle, endAngle, color) {
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
    getTotalHours: function () {
        var dataSubjects = this.__dataSubjects;
        var total = 0;
        var self = this;
        for (var i = 0; i < dataSubjects.length; i++) {
            for (var j = 0; j < self.__dataStudentsPresence.length; j++) {
                if (self.__dataStudentsPresence[j].subjectId == self.__dataSubjects[i].id)
                    if (self.__dataStudentsPresence[j].studying)
                        total += dataSubjects[i].totalTime;
            }
        }
        return total;
    },
    getElapsedHours: function () {
        var dataSubjects = this.__dataSubjects;
        var elapsed = 0;
        var self = this;
        for (var i = 0; i < dataSubjects.length; i++) {
            for (var j = 0; j < self.__dataStudentsPresence.length; j++) {
                if (self.__dataStudentsPresence[j].subjectId == self.__dataSubjects[i].id)
                    if (self.__dataStudentsPresence[j].studying)
                        elapsed += dataSubjects[i].elapsedTime;
            }
        }
        return elapsed;
    },
    getTotalAbsenseTime: function () {
        var totalAbsenseTime = 0;
        var self = this;
        for (var i = 0; i < self.__dataStudentsPresence.length; i++) {
            if (self.__dataStudentsPresence[i].studying)
                totalAbsenseTime += self.__dataStudentsPresence[i].totalAbsenseTime;
            }
        return totalAbsenseTime;
    },
    getWithValidReasonTime: function () {
        var withValidReasonTime = 0;
        var self = this;
        for (var i = 0; i < self.__dataStudentsPresence.length; i++) {
            if (self.__dataStudentsPresence[i].studying)
                withValidReasonTime += self.__dataStudentsPresence[i].withValidReasonTime;
        }
        return withValidReasonTime;
    }
})