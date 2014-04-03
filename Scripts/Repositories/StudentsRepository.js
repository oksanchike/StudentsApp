var StudentsRepository = Base.extend({
    constructor: function () {
        this.lastId = 5;
        this.students = TAFFY([
            { id: 1, gender: "M", surname: "Мостовой", name: "Вячеслав", patronymic: "Игоревич", dateOfBirth: "1992-10-07", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 2, gender: "F", surname: "Запорожец", name: "Оксана", patronymic: "Викторовна", dateOfBirth: "1991-11-29", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 3, gender: "F", surname: "Глухова", name: "Анастасия", patronymic: "Андреевна", dateOfBirth: "1992-01-03", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 4, gender: "F", surname: "Хабибулина", name: "Татьяна", patronymic: "Васильевна", dateOfBirth: "1989-11-01", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 5, gender: "М", surname: "Манойленко", name: "Иван", patronymic: "Владимирович", dateOfBirth: "1990-04-22", dateOfReceipt: "2009-09-01", group: "МТ-202" }
        ]);
    },
    save: function (student) {

        if (student.id !== null) {
            this.students({ id: student.id }).update(student);
        }
        else {       
            student.id = this.lastId+1;
            this.students.insert(student);
            this.lastId++;
        }
    },
    deleteStudent: function (student) {
        this.students({ id: student.id }).remove(student);
    },
    getById: function (id) {
        if (id !== null) {
            var student = this.students({ id: id }).first();
            if (student)
                return student;
            else
                return null;
        }
        else
            return null;
    },
    getAll: function () {
        return this.students().order("surname asec").get();
    }
});