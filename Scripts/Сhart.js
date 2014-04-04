var Chart = Base.extend({
    constructor: function (canvasId, dataStudentsPresence, dataSubjects) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.dataStudentsPresence = dataStudentsPresence;
        this.dataSubjects = dataSubjects;
        this.pieX = (this.canvas.width) / 2;
        this.pieY = (this.canvas.height) / 2 + 50;
        this.pieRadius = Math.min(this.canvas.width, this.canvas.height) / 2 - 70;
        this.drawRectangle();
        this.drawSlices(true);
        this.drawSlices(false);
        this.drawText();
        this.drawLegend();
    },
    drawRectangle: function () {
        var context = this.context;
        context.save();
        var color = "#000";
        var totalLength = this.getTotalLength();
        var index = totalLength / (this.canvas.width - 40);
        var x1 = 20;
        var y1 = 20;
        var width = 25;
        for (var i = 0; i< this.dataSubjects.length; i++){
            var lengthRectangle = this.dataSubjects[i].totalTime/index;
            color = this.dataSubjects[i].color;
            context.beginPath();
            context.rect(x1, y1, lengthRectangle, width);
            context.fillStyle = color;
            context.fill();
            x1 = lengthRectangle + x1;
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

        context.font = 'normal 11pt PT Sans';
        context.fillText("Всего пройдено", this.pieX - 50, this.pieY - 50);
        context.font = 'bold 11pt PT Sans';
        context.fillText(this.dataSubjects[0].elapsedTime, this.pieX - 7, this.pieY - 30);
        this.drawRectangleSmall("#FFCC00", this.pieX - 20, this.pieY - 40);

        context.fillStyle = "black";
        context.font = 'normal 10pt PT Sans';
        context.fillText("Всего прогуляно", this.pieX - 44, this.pieY - 10);
        context.font = 'bold 11pt PT Sans';
        context.fillText(this.dataStudentsPresence[0].totalAbsenseTime, this.pieX - 7, this.pieY + 10);
        this.drawRectangleSmall("rgb(153, 0, 0)", this.pieX - 20, this.pieY);

        context.fillStyle = "black";
        context.font = 'normal 9pt PT Sans';
        context.fillText("Из них", this.pieX-15, this.pieY+30);
        context.fillText("по уважительной причине", this.pieX - 63, this.pieY + 45);
        context.font = 'bold 11pt PT Sans';
        context.fillText(this.dataStudentsPresence[0].withValidReasonTime, this.pieX - 7, this.pieY + 65);
        this.drawRectangleSmall("#0099CC", this.pieX - 20, this.pieY + 55);

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
        var total = this.getTotalValue();
        var startAngle = 1.5*Math.PI;
        var color = "rgb(153, 0, 0)";
        for (var i = 0; i < 4; i++) {
            var slice = this.dataStudentsPresence[0];
            if (i == 0) {
                var sliceAngle = 2 * Math.PI * slice.withValidReasonTime / total;
            }
            if (i == 1) {
                var sliceAngle = 2 * Math.PI * (slice.totalAbsenseTime - slice.withValidReasonTime) / total;
                color = "#0099CC";
            }
            if (i == 2) {
                var sliceAngle = 2 * Math.PI * (75 - slice.totalAbsenseTime) / total;
                color = "#FFCC00";
            }
            if (i == 3) {
                var sliceAngle = 2 * Math.PI * (100 - 75) / total;
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
    drawLegend: function () {

    },
    getTotalValue: function () {
        //var data = this.data;
        var total = 100;
        return total;
    },
    getTotalLength : function () {
        var dataSubjects = this.dataSubjects;
        var total = 0;

        for (var i = 0; i< dataSubjects.length; i++) {
            total += dataSubjects[i].totalTime;
        }

        return total;
    }
})