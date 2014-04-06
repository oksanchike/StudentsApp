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
        this.drawDoughnutChart();
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
        var colors = ["#9999FF", "#CC6699", "#3366FF", "#33CC99", "#CC6633", "#FFCCFF", "#FFFF99", "#CCFFFF"];
        for (var i = 0; i < this.__dataSubjects.length; i++) {
            var rectangleWidth = this.__dataSubjects[i].totalTime / ratio;
            context.beginPath();
            context.rect(x, y, rectangleWidth, height);
            context.fillStyle = colors[i];
            context.fill();
            x += rectangleWidth;
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
            context.font = 'normal 10pt PT Sans';
            context.fillText(text, dx, dy);
        }
        context.restore();
    },
    drawSubjectsText: function () {
        var context = this.context;
        context.save();

        context.fillStyle = "black";
        context.beginPath();
        context.font = 'normal 13pt PT Sans';
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
    drawDoughnutChart: function () {
        var context = this.context;
        this.drawEmptyDoughnut();
        var slice = this.__dataStudentsPresence[0];
        var sliceSubject = this.__dataSubjects[0];
        var total = sliceSubject.totalTime;
        var startAngle = 1.5 * Math.PI;
        var sliceAngle = 2 * Math.PI * slice.withValidReasonTime / total;
        var endAngle = startAngle + sliceAngle;
        this.drawArc(startAngle, endAngle, "#0099CC");
        startAngle = endAngle;
        sliceAngle = 2 * Math.PI * (slice.totalAbsenseTime - slice.withValidReasonTime) / total;
        endAngle = startAngle + sliceAngle;
        this.drawArc(startAngle, endAngle, "#990000");
        startAngle = endAngle;
        sliceAngle = 2 * Math.PI * (sliceSubject.elapsedTime - slice.totalAbsenseTime) / total;
        endAngle = startAngle + sliceAngle;
        this.drawArc(startAngle, endAngle, "#FFCC00");
        this.drawDoughnutDivision();
        context.save();
        this.drawTextAboutPresence(this.pieY - 50, "Всего пройдено", 'normal 11pt PT Sans');
        this.drawNumberAboutPresence(this.pieY - 30, this.__dataSubjects[0].elapsedTime, "#FFCC00");
        this.drawTextAboutPresence(this.pieY - 10, "Всего прогуляно", 'normal 10pt PT Sans');
        this.drawNumberAboutPresence(this.pieY + 10, this.__dataStudentsPresence[0].totalAbsenseTime, "rgb(153, 0, 0)");
        this.drawTextAboutPresence(this.pieY + 30, "Из них", 'normal 9pt PT Sans');
        this.drawTextAboutPresence(this.pieY + 45, "по уважительной причине", 'normal 9pt PT Sans');
        this.drawNumberAboutPresence(this.pieY + 65, this.__dataStudentsPresence[0].withValidReasonTime, "#0099CC");
        context.restore();
    },
    drawDoughnutDivision: function () {
        var context = this.context;
        context.save();
        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        var dx = this.context.measureText("0").width / 2;
        context.fillText("0", this.pieX - dx, this.pieY - 135);
        dx = this.context.measureText(this.__dataSubjects[0].totalTime / 2).width / 2;
        context.fillText(this.__dataSubjects[0].totalTime / 2, this.pieX - dx, this.pieY + 145);
        context.fillText(this.__dataSubjects[0].totalTime / 4, this.pieX + 135, this.pieY);
        dx = this.context.measureText(this.__dataSubjects[0].totalTime / 4 + this.__dataSubjects[0].totalTime / 2).width;
        context.fillText(this.__dataSubjects[0].totalTime / 4 + this.__dataSubjects[0].totalTime / 2, this.pieX - 135 - dx, this.pieY);
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
        context.font = 'bold 11pt PT Sans';
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
        for (var i = 0; i < dataSubjects.length; i++)
            total += dataSubjects[i].totalTime;
        return total;
    }
})