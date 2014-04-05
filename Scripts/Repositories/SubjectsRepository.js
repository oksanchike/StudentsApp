var SubjectsRepository = Base.extend({
    constructor: function () {
        this.subjects = TAFFY([
            { id: 1, title: "Математика", totalTime: 50, elapsedTime: 20, color: "#9999FF" },
            { id: 2, title: "Русский язык", totalTime: 45, elapsedTime: 30, color: "#CC6699" },
            { id: 3, title: "Информатика и ИТК", totalTime: 28, elapsedTime: 25, color: "#3366FF" },
            { id: 4, title: "Литература", totalTime: 18, elapsedTime: 10, color: "#33CC99" },
            { id: 5, title: "Биология", totalTime: 15, elapsedTime: 8, color: "#CC6633" },
            { id: 6, title: "Химия", totalTime: 20, elapsedTime: 15, color: "#FFCCFF" },
            { id: 7, title: "Физика", totalTime: 35, elapsedTime: 21, color: "#FFFF99" },
            { id: 8, title: "География", totalTime: 21, elapsedTime: 9, color: "#CCFFFF" }
        ])
    },
    save: function () {

    },
    deleteSubjects: function () {

    },
    getById: function (id) {
        return this.subjects({ id: id }).first();
    },
    getAll: function () {
        return this.subjects().get();
    }
});