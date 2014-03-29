var SubjectsRepository = Base.extend({
    constructor: function () {
        this.subjects = TAFFY([
            { id: 1, title: "Математика", totalTime: 30, elapsedTime: 12 },
            { id: 2, title: "Русский язык", totalTime: 45, elapsedTime: 20 },
            { id: 3, title: "Информатика и ИТК", totalTime: 28, elapsedTime: 25 },
            { id: 4, title: "Литература", totalTime: 18, elapsedTime: 10 },
            { id: 5, title: "Биология", totalTime: 15, elapsedTime: 8 }
        ])
    },
    save: function () {

    },
    deleteSubjects: function () {
        
    },
    getById: function (id) {
       
    },
    getAll: function () {
        return this.subjects();
    }
});