var Chart = Base.extend({
    constructor: function (canvasId, data) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.data = data;
        this.pieX = (this.canvas.width) / 2;
        this.pieY = (this.canvas.height) / 2 + 30;
        this.pieRadius = Math.min(this.canvas.width, this.canvas.height)/2 - 30;

        //this.drawPieBorder();
        this.drawSlices(true);
        this.drawSlices(false);
        //this.drawPieBorderSmall();
        this.drawLegend();
    },
    drawPieBorder: function () {
        var context = this.context;
        context.save();
        context.fillStyle = "white";
        context.shadowColor = "#777";
        context.shadowBlur = 10;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.beginPath();
        context.arc(this.pieX, this.pieY, this.pieRadius-30, 0, Math.PI*2, false);
        context.fill();
        context.closePath();
        context.restore();
    },
    drawPieBorderSmall: function () {
        var context = this.context;
        context.save();
        context.fillStyle = "white";
        context.beginPath();
        context.arc(this.pieX, this.pieY, this.pieRadius - 38, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(this.pieX, this.pieY, this.pieRadius - 38, 0, Math.PI * 2, false);
        context.clip();

        context.beginPath();
        context.strokeStyle = '#777';
        context.lineWidth = 5;
        context.shadowBlur = 15;
        context.shadowColor = '#777';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.arc(this.pieX, this.pieY, this.pieRadius - 34, 0, Math.PI * 2, false);
        context.stroke();

        context.restore();
    },
    drawSlices: function (withShadow) {
        var context = this.context;
        context.save();
        if (withShadow) {
            context.shadowBlur = 15;
            context.shadowColor = '#999';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 3;
        }
        var total = this.getTotalValue();
        var startAngle = 1.5*Math.PI;
        var color = "rgb(153, 0, 0)";
        for (var i = 0; i < 4; i++) {
            var slice = this.data[0];
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
            //context.moveTo(this.pieX, this.pieY);
            context.arc(this.pieX, this.pieY, this.pieRadius - 30, startAngle, endAngle, false);
            context.lineWidth = 25;
            context.strokeStyle = color;
            context.stroke();
            //context.fillStyle = color;
            //context.fill();
            context.closePath();
            startAngle = endAngle;
        }
        context.restore();
    },
    drawLegend: function () {

    },
    getTotalValue: function () {
        var data = this.data;
        var total = 100;
        return total;
    }
})