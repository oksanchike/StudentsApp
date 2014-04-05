var Chart = Base.extend({
    constructor: function (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");

        this.pieX = (this.canvas.width) / 2;
        this.pieY = (this.canvas.height) / 2 + 50;
        this.pieRadius = Math.min(this.canvas.width, this.canvas.height) / 2 - 60;

    },
    drawForStudent: function (dataStudentsPresence, dataSubjects) {
        this.__dataStudentsPresence = dataStudentsPresence;
        this.__dataSubjects = dataSubjects;

        var totalHours = this.getTotalLength();
        this.drawLineChart(totalHours);
        this.drawDoughnutChart();
        this.drawText();
        //this.drawDivisionLabel();
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

        this.drawRectangles(totalHours, ratio, x+1, y);
        this.drawDivision(x + 2, y, 13, 0);
        this.drawDivision(xFirstQuarter, y, 5);
        this.drawDivision(xMiddle, y, 13, totalHours / 2);
        this.drawDivision(xThirdQuarter, y, 5);
        this.drawDivision(xLast, y, 13, totalHours);
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
    drawDivision: function (x, y, l, text) {
        var context = this.context;

        context.save();
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x, y-l);
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
    drawText: function () {
        var context = this.context;
        context.save();
        context.fillStyle = "black";
        context.beginPath();
        context.font = 'normal 13pt PT Sans';
        context.fillText(this.__dataSubjects[0].title + " ( " + this.__dataSubjects[0].totalTime + " часов )", 20, 80);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        context.fillText("Всего пройдено", this.pieX - 50, this.pieY - 50);
        context.font = 'bold 11pt PT Sans';
        context.fillStyle = "#FFCC00";
        var px = this.context.measureText(this.__dataSubjects[0].elapsedTime).width / 2;
        context.fillText(this.__dataSubjects[0].elapsedTime, this.pieX - px, this.pieY - 30);
        //this.drawRectangleSmall("#FFCC00", this.pieX - 25, this.pieY - 40);

        context.fillStyle = "black";
        context.font = 'normal 10pt PT Sans';
        context.fillText("Всего прогуляно", this.pieX - 44, this.pieY - 10);
        context.font = 'bold 11pt PT Sans';
        context.fillStyle = "rgb(153, 0, 0)";
        px = this.context.measureText(this.__dataStudentsPresence[0].totalAbsenseTime).width / 2;
        context.fillText(this.__dataStudentsPresence[0].totalAbsenseTime, this.pieX - px, this.pieY + 10);
        //this.drawRectangleSmall("rgb(153, 0, 0)", this.pieX - 25, this.pieY);

        context.fillStyle = "black";
        context.font = 'normal 9pt PT Sans';
        context.fillText("Из них", this.pieX - 15, this.pieY + 30);
        context.fillText("по уважительной причине", this.pieX - 63, this.pieY + 45);
        context.font = 'bold 11pt PT Sans';
        context.fillStyle = "#0099CC";
        px = this.context.measureText(this.__dataStudentsPresence[0].withValidReasonTime).width / 2;
        context.fillText(this.__dataStudentsPresence[0].withValidReasonTime, this.pieX - px, this.pieY + 65);
        //this.drawRectangleSmall("#0099CC", this.pieX - 25, this.pieY + 55);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        context.fillText("0", this.pieX - 3, this.pieY - 135);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        px = this.context.measureText(this.__dataSubjects[0].totalTime / 2).width / 2;
        context.fillText(this.__dataSubjects[0].totalTime / 2, this.pieX - px, this.pieY + 145);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        context.fillText(this.__dataSubjects[0].totalTime / 4, this.pieX + 135, this.pieY);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        px = this.context.measureText(this.__dataSubjects[0].totalTime / 4 + this.__dataSubjects[0].totalTime / 2).width;
        context.fillText(this.__dataSubjects[0].totalTime / 4 + this.__dataSubjects[0].totalTime / 2, this.pieX - 135 - px, this.pieY);

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
        context.arc(this.pieX, this.pieY, this.pieRadius - 30, 0, 2*Math.PI, false);
        context.lineWidth = 30;
        context.strokeStyle = "#E8E8E8";
        context.stroke();
        context.closePath();
        context.restore();
    },
    drawDoughnutChart: function () {
        this.drawEmptyDoughnut();
        var context = this.context;
        context.save();
        var slice = this.__dataStudentsPresence[0];
        var sliceSubject = this.__dataSubjects[0];
        var total = sliceSubject.totalTime;
        var startAngle = 1.5 * Math.PI;
        var color = "#0099CC";
        for (var i = 0; i < 3; i++) {
            if (i == 0) {
                var sliceAngle = 2 * Math.PI * slice.withValidReasonTime / total; //нужно пересчитать
            }
            if (i == 1) {
                var sliceAngle = 2 * Math.PI * (slice.totalAbsenseTime - slice.withValidReasonTime) / total; //нужно пересчитать
                color = "rgb(153, 0, 0)";
            }
            if (i == 2) {
                var sliceAngle = 2 * Math.PI * (sliceSubject.elapsedTime - slice.totalAbsenseTime) / total; //нужно пересчитать
                color = "#FFCC00";
            }
            var endAngle = startAngle + sliceAngle;

            context.beginPath();
            context.arc(this.pieX, this.pieY, this.pieRadius - 30, startAngle, endAngle, false);
            context.lineWidth = 30;
            context.strokeStyle = color;
            context.stroke();
            context.closePath();
            startAngle = endAngle;
        }
        context.restore();
    },
    getTotalLength: function () {
        var dataSubjects = this.__dataSubjects;
        var total = 0;

        for (var i = 0; i < dataSubjects.length; i++) {
            total += dataSubjects[i].totalTime;
        }

        return total;
    }
})