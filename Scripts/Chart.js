var Chart = Base.extend({
    constructor: function (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");

        this.pieX = (this.canvas.width) / 2;
        this.pieY = (this.canvas.height) / 2 + 50;
        this.pieRadius = Math.min(this.canvas.width, this.canvas.height) / 2 - 60;

    },
    drawForStudent: function (dataStudentsPresence, dataSubjects) {
        this.dataStudentsPresence = dataStudentsPresence;
        this.dataSubjects = dataSubjects;

        var totalHours = this.getTotalLength();
        this.drawLineChart(totalHours);

        this.drawSlices(true);
        this.drawSlices(false);
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

        this.drawRectangles(totalHours, ratio);
        this.drawDivision(x + 2, y, 13, 0);
        this.drawDivision(xFirstQuarter, y, 5);
        this.drawDivision(xMiddle, y, 13, totalHours / 2);
        this.drawDivision(xThirdQuarter, y, 5);
        this.drawDivision(xLast, y, 13, totalHours);
    },
    drawRectangles: function (totalLength, ratio) {
        var context = this.context;
        context.save();
        var color = "#000";
        var x1 = 20;
        var y1 = 30;
        var width = 25;
        for (var i = 0; i < this.dataSubjects.length; i++) {
            var lengthRectangle = this.dataSubjects[i].totalTime / ratio;
            color = this.dataSubjects[i].color;
            context.beginPath();
            context.rect(x1, y1, lengthRectangle, width);
            context.fillStyle = color;
            context.fill();
            x1 = lengthRectangle + x1;
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
    drawRectangleSmall: function (color, x, y) {
        var context = this.context;
        context.save();
        context.beginPath();
        context.rect(x, y, 10, 10);
        context.fillStyle = color;
        context.fill();
        context.closePath();
        context.restore();
    },
    drawText: function () {
        var context = this.context;
        context.save();
        context.fillStyle = "black";
        context.beginPath();
        context.font = 'normal 13pt PT Sans';
        context.fillText(this.dataSubjects[0].title + " ( " + this.dataSubjects[0].totalTime + " часов )", 20, 80);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        context.fillText("Всего пройдено", this.pieX - 50, this.pieY - 50);
        context.font = 'bold 11pt PT Sans';
        context.fillStyle = "#FFCC00";
        var px = this.context.measureText(this.dataSubjects[0].elapsedTime).width / 2;
        context.fillText(this.dataSubjects[0].elapsedTime, this.pieX - px, this.pieY - 30);
        //this.drawRectangleSmall("#FFCC00", this.pieX - 25, this.pieY - 40);

        context.fillStyle = "black";
        context.font = 'normal 10pt PT Sans';
        context.fillText("Всего прогуляно", this.pieX - 44, this.pieY - 10);
        context.font = 'bold 11pt PT Sans';
        context.fillStyle = "rgb(153, 0, 0)";
        px = this.context.measureText(this.dataStudentsPresence[0].totalAbsenseTime).width / 2;
        context.fillText(this.dataStudentsPresence[0].totalAbsenseTime, this.pieX - px, this.pieY + 10);
        //this.drawRectangleSmall("rgb(153, 0, 0)", this.pieX - 25, this.pieY);

        context.fillStyle = "black";
        context.font = 'normal 9pt PT Sans';
        context.fillText("Из них", this.pieX - 15, this.pieY + 30);
        context.fillText("по уважительной причине", this.pieX - 63, this.pieY + 45);
        context.font = 'bold 11pt PT Sans';
        context.fillStyle = "#0099CC";
        px = this.context.measureText(this.dataStudentsPresence[0].withValidReasonTime).width / 2;
        context.fillText(this.dataStudentsPresence[0].withValidReasonTime, this.pieX - px, this.pieY + 65);
        //this.drawRectangleSmall("#0099CC", this.pieX - 25, this.pieY + 55);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        context.fillText("0", this.pieX - 3, this.pieY - 135);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        px = this.context.measureText(this.dataSubjects[0].totalTime / 2).width / 2;
        context.fillText(this.dataSubjects[0].totalTime / 2, this.pieX - px, this.pieY + 145);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        context.fillText(this.dataSubjects[0].totalTime / 4, this.pieX + 135, this.pieY);

        context.fillStyle = "black";
        context.font = 'normal 11pt PT Sans';
        px = this.context.measureText(this.dataSubjects[0].totalTime / 4 + this.dataSubjects[0].totalTime / 2).width;
        context.fillText(this.dataSubjects[0].totalTime / 4 + this.dataSubjects[0].totalTime / 2, this.pieX - 135 - px, this.pieY);

        context.closePath();
        context.restore();
    },
    drawSlices: function (withShadow) {
        var context = this.context;
        context.save();
        if (withShadow) {
            context.shadowBlur = 15;
            context.shadowColor = "#999";
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 3;
        }
        var slice = this.dataStudentsPresence[0];
        var sliceSubject = this.dataSubjects[0];
        var total = sliceSubject.totalTime;
        var startAngle = 1.5 * Math.PI;
        var color = "#0099CC";
        for (var i = 0; i < 4; i++) {
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
            if (i == 3) {
                var sliceAngle = 2 * Math.PI * (total - sliceSubject.elapsedTime) / total; //нужно пересчитать
                color = "#E8E8E8";
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
    drawDivisionLabel: function (x, y, text) {
        var context = this.context;
        var dx = this.context.measureText(text).width / 2;

        context.save();
        context.fillStyle = "#999";
        context.beginPath();
        context.font = 'normal 10pt PT Sans';
        context.fillText(text, x-dx, y);
    },
    getTotalLength: function () {
        var dataSubjects = this.dataSubjects;
        var total = 0;

        for (var i = 0; i < dataSubjects.length; i++) {
            total += dataSubjects[i].totalTime;
        }

        return total;
    }
})